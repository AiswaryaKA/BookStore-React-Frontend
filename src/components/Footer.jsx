import React from 'react'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';


function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 bg-gray-800 py-10 px-5 text-white'>

        <div className='p-9'>

          <Link to={'/'}> <h1 className='text-3xl'>ABOUT US</h1></Link>

          <p className='mt-3 text-justify'>orem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo itaque necessitatibus quas nobis, illum voluptate, pariatur recusandae alias harum!</p>
        </div>
       
        <div className='p-9'>
          <h1 className='text-3xl'>NEWSLETTER</h1>
          <p>Stay updated with our latest trends</p>
          <div className='flex mt-4'>
            <input type="text" placeholder='' className='p-3 bg-amber-50 placeholder-neutral-500 w-full' />
            <button className='bg-amber-300 text-white  px-3'><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
          
        </div>

        <div className='p-9 flex  flex-col'>
        <h1 className='text-3xl mb-3'>FOLLOW US</h1>
        <p>Let us be social</p>

        <div className='flex justify-start mt-8'>
            <FontAwesomeIcon icon={faInstagram} className='fa-xl' />
            <FontAwesomeIcon icon={faFacebook} className=' ms-2 fa-xl' />
            <FontAwesomeIcon icon={faTwitter} className='ms-2 fa-xl'/>
            <FontAwesomeIcon icon={faLinkedin} className='ms-2 fa-xl' />
          </div>
         
         </div>




      </div>
      <div className='p-3 w-full bg-gray-900 text-white flex justify-center'>
      
           <p className='text-xs md:text-sm'>Copyright © 2023 All rights reserved | This website is made with by <FontAwesomeIcon icon={faHeart} className='text-amber-200'/> Aiswarya K A</p>
      
          </div>

    </>
  )
}

export default Footer