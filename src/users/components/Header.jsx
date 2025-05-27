import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userProfileUpdateStatusContext } from '../../context/Contextshare'
import { serverUrl } from '../../services/serverUrl'



function Header() {

  const [status, setStatus] = useState(false)
  const [dropdownStatus, setdropdownStatus] = useState(false)
  const [token, setToken] = useState("")

  const [userD, setUserD] = useState({
    profile: ""
  })
  // console.log(token);

  const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)


  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem("token")
    setToken("")
    navigate('/')
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setUserD({ profile: user.profile })
    }
  }, [userProfileUpdateStatus])

  return (
    <>
      <div className='md:grid grid-cols-3 p-3'>

        <div className='flex items-center'>
          <img src="https://i.pinimg.com/736x/e5/d5/c4/e5d5c4b5acb462a4080d3bf6f5f11652.jpg" alt="" style={{ width: '50px', height: '50px' }} />
          <h1 className='text-2xl md:hidden ms-2'>BOOK STORE</h1>

        </div>
        <div className='md:flex justify-center items-center hidden'>
          <h1 className='text-3xl'>BOOK STORE</h1>
        </div>
        <div className='md:flex justify-end items-center hidden'>
          <FontAwesomeIcon icon={faInstagram} className='me-3' />
          <FontAwesomeIcon icon={faFacebook} className='me-3' />
          <FontAwesomeIcon icon={faXTwitter} className='me-3' />
          {!token ?
            <Link to={'/login'}><button className='border border-black rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>

            :

            <div className="relative inline-block text-left">
              <div>
                <button onClick={() => setdropdownStatus(!dropdownStatus)} type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">

                  <img src={userD.profile == "" ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : `${serverUrl}/upload/${userD.profile}`} alt="no image" style={{ width: '40px', height: '40px' }} className='mx-4 rounded-full' />



                </button>
              </div>


              {dropdownStatus && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div class="py-1" role="none">

                  <Link to={'/profile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' />Profile</p></Link>
                  <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

                </div>
              </div>}
            </div>}

        </div>


      </div>

      <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center'>

        <div className='flex justify-between items-center px-3 md:hidden'>

          <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>
          {!token ?
            <Link to={'/login'}><button className='border border-white rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>
            :
            <div className="relative inline-block text-left">
              <div>
                <button onClick={() => setdropdownStatus(!dropdownStatus)} type="button" class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">

                  <img src={userD.profile == "" ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : `${serverUrl}/upload/${userD.profile}`} alt="no image" style={{ width: '40px', height: '40px' }} className='mx-4 rounded-full' />



                </button>
              </div>


              {dropdownStatus && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div class="py-1" role="none">

                  <Link to={'/profile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' />Profile</p></Link>
                  <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

                </div>
              </div>}
            </div>}


        </div>
        <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
          <Link to={'/'}><li className='mx-4 mt-3 md:mt-0'>Home</li></Link>
          <Link to={'/all-books'}> <li className='mx-4  mt-3 md:mt-0'>Books</li></Link>
          <Link to={'/careers'}><li className='mx-4  mt-3 md:mt-0'>Careers</li></Link>
          <Link to={'/contact'}> <li className='mx-4  mt-3 md:mt-0'>Contact</li></Link>
        </ul>

      </nav>

    </>
  )
}

export default Header