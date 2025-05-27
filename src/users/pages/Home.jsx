import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import {searchKeyContext} from '../../context/Contextshare'


function Home() {

  const [homeBook, setHomeBook] = useState([])
  const { searchkey, setsearchkey } = useContext(searchKeyContext)
  const navigate = useNavigate()


  const getAllBookHome = async () => {
    const result = await homeBookApi()
    //console.log(result);

    if (result.status == 200)
      setHomeBook(result.data)

  }
  //console.log(homeBook);

  const handlesearch = () => {
    console.log('inside handleserach');
    const token = sessionStorage.getItem('token')

    if (searchkey == "") {
      toast.info('Please enter the title of the book')
    }
    else if(!token){
      toast.info('Please login')
     setTimeout(() => {
       navigate('/login')

     }, 2500);
    }
    else if (searchkey && token){
      navigate('/all-books')
    }
    else{
      toast.error('something went wrong')
    }
  }


  useEffect(() => {
    setsearchkey('')
    getAllBookHome()
  }, [])
  return (
    <>
      <Header />
      <header className='flex justify-center items-center'>
        <div id="main" className='flex justify-center items-center w-full'>
          <div className='md:grid grid-cols-3 w-full'>
            <div></div>
            <div className='text-white flex justify-center items-center flex-col px-5'>
              <h1 className='text-5xl'>Wonderful Gifts</h1>
              <p>Give your family and friends a Book</p>

              <div className='flex mt-10 w-full'>
                <input type="text" placeholder='Search Books' className='py-2 px-4 bg-white rounded-3xl placeholder-gray-400 w-full text-black' onChange={(e) => setsearchkey(e.target.value)} />
                <FontAwesomeIcon onClick={handlesearch} icon={faMagnifyingGlass} className='text-blue-800' style={{ marginTop: '11px', marginLeft: '-30px' }} />
              </div>
            </div>
            <div></div>

          </div>
        </div>
      </header>


      {/* New Arrivals */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h2>NEW ARRIVIALS</h2>
        <h4>Explore Our Latest Collection</h4>

        <div className='md:grid grid-cols-4 w-full mt-5 gap-2'>
          {
            homeBook?.length > 0 ?
              homeBook?.map((item) => (
                <div className='p-3 shadow-md'>
                  <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} />
                  <div className='flex justify-center flex-col items-center mt-3'>
                    <p className='text-blue-700'>{item?.author}</p>
                    <p>{item?.title}</p>
                    <p>${item?.dprice}</p>
                  </div>

                </div>

              )) :
              <p>Loading</p>
          }


        </div>

        <div className='flex justify-center items-center my-5'>
          <Link to={'/all-books'}>
            <button className='px-3 py-3 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>
              Explore More
            </button>
          </Link>
        </div>
      </section>

      {/* Author */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className='md:grid grid-cols-2'>
          <div>
            <div className='flex justify-center items-center flex-col'>
              <h4>FEATURED AUTHORS</h4>
              <h3 className='text-2xl'>Captivates with every word</h3>
            </div>
            <p className='mt-6 text-justify'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.</p>
            <p className='mt-6 text-justify'>
              Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>
          </div>

          <div className='px-10 pt-8 mt-14'>
            <img src="https://st.depositphotos.com/1011643/2348/i/450/depositphotos_23483051-stock-photo-modern-businesswoman-holding-tablet-computer.jpg" alt="no image" className='w-full' style={{ width: '100%', height: '330px' }} />
          </div>
        </div>
      </section>
      {/* Testimonial */}

      <div className='flex justify-center items-center flex-col md:py-10 md:px-40 p-6'>
        <h3>TESTIMONIALS</h3>
        <h3 className='text-2xl mb-5'>See What Others Are Saying</h3>

        <img src="https://static.vecteezy.com/system/resources/thumbnails/053/182/092/small_2x/confident-businesswoman-looking-out-of-window-photo.jpg" alt="no image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <h6 className='mt-3'>Treesa Joseph</h6>
        <p className='mt-3 text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae ipsam sapiente amet quo, molestiae reprehenderit optio quos molestias perspiciatis error ad cum, dolorum eius ullam beatae hic mollitia. Dicta ipsam cum assumenda. Reprehenderit aperiam, facere magni minima quisquam perspiciatis, nemo earum magnam hic, recusandae possimus? Voluptatum fugiat illum laborum rerum!</p>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />

    </>
  )
}

export default Home