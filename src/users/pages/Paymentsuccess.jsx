import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

function Paymentsuccess() {
  return (
    <>
    <Header/>
    <div className="container my-10" style={{marginTop:'50px'}}>

        <div className="md:grid grid-cols-2 px-20">

            <div className='flex justify-center flex-col'>
                <h1 className='md:text-4xl text-green-600'>Congratulations ! Your Payment is successfull</h1>
                <p className='my-5'>Thankyou for shopping with Bookstore . Hope you have a good time with us</p>
               <Link to={'/all-books'}> <button className='bg-blue-900 px-6 py-3 text-white rounded my-5 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800 font-medium'><FontAwesomeIcon icon={faBackward} className='me-2'/>Explore More Books</button></Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://static.wixstatic.com/media/d509f2_40639edcd3414e038b43579c9c1bbc71~mv2.gif" className='w-full' alt="no image" />
            </div>

        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Paymentsuccess