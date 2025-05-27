import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookApi, getAllBookAdminApi, getAllUsersApi } from '../../services/allApi'
import { ToastContainer } from 'react-toastify'

function AdminBooks() {
  const [bookliststatus, setbookliststatus] = useState(true)
  const [usersstatus, setusersstatus] = useState(false)
  const [bookdetails, setBookDetails] = useState([])
  const [token, setToken] = useState("")
  const [approveStatus, setAprroveStatus] = useState(false)
  const [allusers , setAllUsers] = useState([])

  const getAllBookAdmin = async (token) => {

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await getAllBookAdminApi(reqHeader)
    //console.log(result);
    if (result.status == 200) {
      setBookDetails(result.data)
    }

  }
  //console.log(bookdetails);


  const approvebook = async (data) => {

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await approveBookApi(data, reqHeader)
    console.log(result);

    if (result.status == 200) {
      setAprroveStatus(!approveStatus)
    }
    else {
      toast.error('Something went wrong')
    }

  }
  //function to get all users
  const getAllUsers = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await getAllUsersApi(reqHeader)
    console.log(result);

    if(result.status == 200){
      setAllUsers(result.data)
    }

  }




  useEffect(() => {
    
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      setToken(token)

      if (bookliststatus == true) {
        getAllBookAdmin(token)
      }
      else if (usersstatus == true) {
        getAllUsers(token)
      }
      else {
        console.log('Something went wrong');

      }

    }
  }, [approveStatus, usersstatus])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center my-5'>All Books</h1>
          {/* tab */}
          <div className='flex justify-center items-center my-5'>
            <p onClick={() => { setbookliststatus(true), setusersstatus(false) }} className={bookliststatus ? 'p-4 text-blue-600 rounded border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black rounded border-t border-r border-gray-200 cursor-pointer'}>Book List</p>
            <p onClick={() => { setbookliststatus(false), setusersstatus(true) }} className={usersstatus ? 'p-4 text-blue-600 rounded border-b border-l border-gray-200 cursor-pointer' : 'p-4 text-black rounded border-b border-l border-gray-200 cursor-pointer'}>Users</p>
          </div>
          {bookliststatus &&
            <div className='md:grid grid-cols-4 gap-5 md:mx-20 mx-5 mb-5'>

              {bookdetails?.length > 0 ?
                bookdetails?.map((item, index) => (
                  <div key={index}>
                    <div className={item?.status == 'sold' ? 'p-3 m-5  md:m-0 shadow-lg opacity-58' : 'p-3 md:m-0 shadow-lg'}>
                      <img src={item?.imageurl} alt="book image" style={{ width: '100%', height: "150px" }} />
                      <div className='flex justify-center items-center flex-col'>
                        <p className='text-blue-700 text-sm'>{item?.author.slice(0, 20)}...</p>
                        <h3>{item?.title.slice(0, 20)}</h3>
                        <p className='text-xs text-red-700 mb-1'>${item?.dprice}</p>
                        {item?.status == 'pending' && <button onClick={() => approvebook(item)} className='bg-green-600 p-2 text-white w-full hover:border hover:border-green-800 hover:bg-white hover:text-green-700'>Approve</button>}

                        {item?.status == 'approved' && <div className='flex justify-end w-full'><img src="https://png.pngtree.com/png-vector/20221126/ourmid/pngtree-isolated-on-a-white-background-a-vector-symbol-of-a-green-tick-icon-representing-a-checkmark-vector-png-image_42552088.jpg" alt="" style={{ width: '50px', height: '50px' }} /></div>}

                      </div>
                    </div>
                  </div>
                )) :
                <p>No books</p>
              }




            </div>
          }

          {usersstatus &&
            <div className='md:grid grid-cols-3 gap-5 mx-10'>

              {
                allusers?.length>0 ?
                allusers?.map((users , index)=>(
                   <div className='bg-gray-300 rounded p-3 mb-5' key={index}>
                <p className='text-red-600 mb-2'>ID: {users?._id}</p>
                <div className='flex gap-5'>
                  <div>
                    <img src={users?.profile == ""?"https://cdn-icons-png.freepik.com/512/8742/8742495.png":`${users?.profile}`} alt="no image" style={{ height: "50px" , borderRadius:'50%' }} />
                  </div>
                  <div className='ms-3'>
                    <h3 className='text-blue-600 text-xl'>{users?.username}</h3>
                    <p>{users?.email}</p>
                  </div>
                </div>
              </div>
                )) :
                <p>No Users</p>
              }
             
              


            </div>}

        </div>


      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminBooks