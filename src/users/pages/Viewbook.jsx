import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'

import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { Link, useParams } from 'react-router-dom'
import { makePaymentApi, viewABookApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import {loadStripe} from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify'

function Viewbook() {

  const [bookphoto, setBookPhoto] = useState(false)

  const [viewBookDetails, setViewBookDetails] = useState({})

  const [token , setToken] = useState("")

  const { id } = useParams()
  console.log(id);


  const viewABook = async (id) => {
    const result = await viewABookApi(id)
    console.log(result);

    if (result.status == 200) {
      setViewBookDetails(result.data)
    }

  }
  console.log(viewBookDetails);

  //function to make payment

  const makePayment = async()=>{
    console.log(viewBookDetails);
    //object-instance
    const stripe = await loadStripe('pk_test_51RSxysI2ZsleBLUMU4AhKQae9FRaDGlTRwcw3hsiukxEYuEgyNQPdwz5SpAbqhou44xQEOef4onkVNaC9LEiR3mw00qLCR50QL');
    
    //data to update in backend
    const reqBody = {
      booksDetails : viewBookDetails
    }

     const reqHeader = {
      'Authorization': `Bearer ${token}`
    }

    const result = await makePaymentApi(reqBody , reqHeader)
    console.log(result);
   // console.log(result.data.existingBook);

    const sessionId = result.data.sessionId

    const response = stripe.redirectToCheckout({
      sessionId:sessionId
    })
    if(response.error){
      toast.error('something went wrong')
    }
    
    

  }


  useEffect(() => {
    viewABook(id)
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      setToken(token)
    }
  }, [])

  return (
    <>
      <Header />
      <div className=' mb-8 p-5 md:p-10 m-3 md:m-5 border border-gray-300 shadow-2xl rounded'>
        <div className='md:grid grid-cols-[1fr_3fr] '>

          <div className='mb-8 md:mb-0 cursor-pointer'>
            <img src={viewBookDetails?.imageurl} alt="" className='w-full h-full' />
          </div>




          <div className='md:px-8 relative'>
            <h1 className='font-bold text-md md:text-2xl text-center mb-2 md:mb-3'>{viewBookDetails?.title}</h1>
            <p className='text-blue-500 text-center font-semibold'>{viewBookDetails?.author} </p>

            <div className='md:flex space-y-3 md:space-y-0 justify-between items-center gap-5 mt-13'>
              <div className='flex flex-col  space-y-3'>
                <p className='font-bold '>Publisher : {viewBookDetails?.publisher}</p>
                <p className='font-bold '>Seller Mail :{viewBookDetails?.userMail}</p>

              </div>

              <div className='flex flex-col space-y-3'>
                <p className='font-bold '> Language : {viewBookDetails?.language}</p>

                <p className='font-bold '>Real Price : ${viewBookDetails?.price}</p>

              </div>

              <div className='flex flex-col space-y-3'>
                <p className='font-bold '>No. of pages : {viewBookDetails?.noofpages}</p>
                <p className='font-bold '>ISBN :{viewBookDetails?.isbn}</p>

              </div>
            </div>

            <div className='mt-8 md:mt-15 font-bold  text-justify'>{viewBookDetails?.abstarct}</div>

            <div className='flex justify-between md:justify-end gap-5 mt-8 md:mt-35 items-center'>

              <Link to={'/all-books'}>
                <button className='px-8 md:px-5 py-3 text-white bg-blue-500 rounded'>
                  <FontAwesomeIcon icon={faBackward} className='me-3' />
                  Back</button>
              </Link>

              <button type='button' onClick={makePayment} className=' px-8 md:px-5 py-3 text-white bg-green-600 rounded'>Buy ₹{viewBookDetails?.dprice}</button>
            </div>
            <div className='absolute top-0 text-gray-600 text-xl right-2'><FontAwesomeIcon icon={faEye} onClick={() => setBookPhoto(true)} /></div>

          </div>


        </div>

      </div>

      {/* book modal eye */}

      {bookphoto && (
       <div onClick={() => setBookPhoto(false)} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <div className="bg-gray-900 p-3 text-white flex justify-between">
                  <h3>Book Photos</h3>
                  <FontAwesomeIcon icon={faXmark} onClick={() => setBookPhoto(false)} />
                </div>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <p className="text-blue-500">
                    <FontAwesomeIcon icon={faCamera} className="me-3" />
                    Camera click of the book in the hand of seller
                  </p>

                  <div className="md:flex my-4">
                     {
                  viewBookDetails?.uploadedImg.map((item) => (
                    <img
                      src={`${serverUrl}/upload/${item}`}
                      alt="Book"
                      className=" w-full  "
                    />
                  ))
                }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
      <Footer />

    </>
  )
}

export default Viewbook