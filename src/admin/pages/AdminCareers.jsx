import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSquareArrowUpRight, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'

import AdminSidebar from '../components/AdminSidebar'
import { toast, ToastContainer } from 'react-toastify'
import { addJobApi, deleteAJobApi, getAllApplicationsApi, getAllJobsApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { Link } from 'react-router-dom'

function AdminCareers() {
  const [jobpostStatus, setjobpostStatus] = useState(true)
  const [viewapplicationStatus, setviewapplicationStatus] = useState(false)
  const [modalstatus, setmodalstatus] = useState(false)
  const [addJobStatus, setaddJobStatus] = useState({})
  const [deleteJobStatus, setDeleteJobStatus] = useState({})

  const [searchKey, setsearchKey] = useState("")
  const [allApplication, setAllApplication] = useState([])


  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    jType: "",
    salary: "",
    qualification: "",
    experience: "",
    description: ""

  })
  // console.log(jobDetails);

  const [allJobs, setAllJobs] = useState([])

  const handleReset = () => {
    setJobDetails({
      title: "",
      location: "",
      jType: "",
      salary: "",
      qualification: "",
      experience: "",
      description: ""
    })
  }

  //to add job
  const handleSubmit = async () => {
    const { title, location, jType, salary, qualification, experience, description } = jobDetails

    if (!title || !location || !jType || !salary || !qualification || !experience || !description) {

      toast.info('Please fill the fields completely')
    }
    else {

      const result = await addJobApi(jobDetails)
      console.log(result);

      if (result.status == 200) {
        toast.success('Job added successfully')
        handleReset()
        setmodalstatus(false)
        setaddJobStatus(result.data)
      }
      else if (result.status == 401) {
        toast.info(result.response.data)
        handleReset()
      }
      else {
        toast.error("Something went wrong")
        handleReset()
      }

    }
  }

  //to get job
  const getAllJobs = async (searchKey) => {
    const result = await getAllJobsApi(searchKey)
    //console.log(result);

    if (result.status == 200) {
      setAllJobs(result.data)
    }

  }

  // console.log(allJobs);

  //delete Job

  const deleteJob = async (id) => {
    const result = await deleteAJobApi(id)
    console.log(result);

    if (result.status == 200) {
      setDeleteJobStatus(result)
    }

  }

  //get all applications
  const getAllApplication = async () => {
    const result = await getAllApplicationsApi()
   // console.log(result);
    
    if (result.status == 200) {
      setAllApplication(result.data);

    }
  }
  console.log(allApplication);



  useEffect(() => {
    if (jobpostStatus == true) {
      getAllJobs(searchKey)
    }
    else if (viewapplicationStatus == true) {
      getAllApplication(true)
    }
    else {
      console.log('Something went wrong');

    }

  }, [addJobStatus, searchKey, deleteJobStatus, viewapplicationStatus])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center my-5'>Careers</h1>
          {/* tab */}
          <div className='flex justify-center items-center my-5'>
            <p onClick={() => { setjobpostStatus(true), setviewapplicationStatus(false) }} className={jobpostStatus ? 'p-4 text-black rounded border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-blue-600 rounded border-t border-r border-gray-200 cursor-pointer'}>Job Post</p>
            <p onClick={() => { setjobpostStatus(false), setviewapplicationStatus(true) }} className={viewapplicationStatus ? 'p-4 text-black rounded border-b border-l border-gray-200 cursor-pointer' : 'p-4 text-blue-600 rounded border-b border-l border-gray-200 cursor-pointer'}>View Applicant</p>
          </div>
          {jobpostStatus &&
            <div>
              <div className='flex justify-between md:px-10 py-5 p-5'>
                <div className='flex justify-center items-center my-5'>
                  <input value={searchKey} onChange={(e) => setsearchKey(e.target.value)} placeholder='Job Title' className='border border-gray-400 px-5 py-2 md:w-96 w-40 placeholder-gray-400' type="text" />
                  <button className='bg-green-800 text-white px-5 py-2 border border-green-800 hover:bg-white hover:text-green-800'>Search</button>
                </div>
                <div>
                  <button onClick={() => setmodalstatus(true)} className='border border-blue-900 bg-white text-blue-900 px-5 py-2 hover:bg-blue-900 hover:text-white my-5'>Add Job</button>
                </div>
              </div>
              <div className='md:px-10 py-5 p-5'>

                {
                  allJobs?.length > 0 ?
                    allJobs?.map((items, index) => (
                      <div className='shadow border border-gray-500 mt-5' key={index}>
                        <div className="md:grid grid-cols-[8fr_1fr] p-5">
                          <div>
                            <h1 className='mb-3 text-xl font-semibold'>{items?.title}</h1>
                            <hr />
                            <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='text-blue-600 me-3' />{items?.location}</p>
                            <p className='mt-3'> Job Type:{items?.jType}</p>
                            <p className='mt-3'> Salary:{items?.salary}</p>
                            <p className='mt-3'> Qualification:{items?.qualification}</p>
                            <p className='mt-3'> Experience:{items?.experience}</p>
                            <p className='text-justify'>Description : {items?.description}</p>
                          </div>
                          <div className='flex md:justify-center items-start justify-end'>
                            <button onClick={() => deleteJob(items?._id)} className='bg-red-800 text-white px-2 py-2 border border-red-800 hover:bg-white hover:text-red-800  rounded ms-3 md:mt-0 mt-5'> Delete <FontAwesomeIcon icon={faTrashCan} /></button>
                          </div>

                        </div>
                      </div>
                    )) :
                    <p>No Jobs</p>
                }

              </div>
            </div>

          }


          {modalstatus && <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                  {/* title */}

                  <div class="bg-gray-900 p-4 flex sm:px-6 justify-between">
                    <h1 className='text-white text-2xl'>Application form</h1>
                    <FontAwesomeIcon onClick={() => setmodalstatus(false)} icon={faXmark} className='text-white fa-2x' />
                  </div>

                  {/* body */}
                  <div class="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-3">
                      <input type="text" value={jobDetails.title} onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })} placeholder='Job Title' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div> <div className="mb-3">
                      <input type="text" value={jobDetails.location} onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} placeholder='Location' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div> <div className="mb-3">
                      <input type="text" value={jobDetails.jType} onChange={(e) => setJobDetails({ ...jobDetails, jType: e.target.value })} placeholder='Job Type' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div> <div className="mb-3">
                      <input type="text" value={jobDetails.salary} onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })} placeholder='Salary' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div> <div className="mb-3">
                      <input type="text" value={jobDetails.qualification} onChange={(e) => setJobDetails({ ...jobDetails, qualification: e.target.value })} placeholder='Qualification' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div> <div className="mb-3">
                      <input type="text" value={jobDetails.experience} onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })} placeholder='Experience' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div> <div className="mb-3">
                      <textarea name="" value={jobDetails.description} onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })} id="" placeholder='Description' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full'></textarea>
                    </div>
                  </div>

                  {/* footer of modal */}
                  <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" onClick={handleSubmit} class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border-gray-300">Submit</button>
                    <button type="button" onClick={handleReset} class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black">Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>}


          {viewapplicationStatus &&
            <div>
              <div className='flex justify-center items-center md:px-10 py-5 p-5'>
                <div className='flex justify-center items-center my-5'>
                  <input placeholder='Job Title' className='border border-gray-400 px-5 py-2 md:w-96 w-40 placeholder-gray-400' type="text" />
                  <button className='bg-green-800 text-white px-5 py-2 border border-green-800 hover:bg-white hover:text-green-800'>Search</button>
                </div>
              </div>
              <div className='overflow-x-auto '>
                <div className='flex justify-center items-center'>
                  {
                    allApplication?.length > 0 ?
                      <table className='border border-gray-200 justify-center items-center m-10'>
                        <thead className='border'>
                          <tr className='bg-blue-700 text-white font-medium border'>
                            <th className="py-2 px-4 border-gray-500">Sl.No.</th>
                            <th className="py-2 px-4 border-gray-500">Job Title</th>
                            <th className="py-2 px-4 border-gray-500">Name</th>
                            <th className="py-2 px-4 border-gray-500">Qualification</th>
                            <th className="py-2 px-4 border-gray-500">Email</th>
                            <th className="py-2 px-4 border-gray-500">Phone</th>
                            <th className="py-2 px-4 border-gray-500">Cover Letter</th>
                            <th className="py-2 px-4 border-gray-500">Resume</th>
                          </tr>
                        </thead>
                        <tbody className='border'>
                          {
                            allApplication?.map((item, index) => (
                              <tr key={index} className='border border-gray-200'>
                                <th className="py-2 px-4 border border-gray-500">{index+1}</th>
                                <th className="py-2 px-4 border border-gray-500">{item?.jobtitle}</th>
                                <th className="py-2 px-4 border border-gray-500">{item?.fullname}</th>
                                <th className="py-2 px-4 border border-gray-500">{item?.qualification}</th>
                                <th className="py-2 px-4 border border-gray-500">{item?.email}</th>
                                <th className="py-2 px-4 border border-gray-500">{item?.phone}</th>
                                <th className="py-2 px-4 border border-gray-500">{item?.coverletter}</th>
                                <th className="py-2 px-4 border border-gray-500"><Link  to={`${serverUrl}/pdfUploads/${item?.resume}`} target='_blank' className='text-blue-600 underline'>resume</Link></th>
                              </tr>
                            ))
                          }

                        </tbody>
                      </table> :
                      <p>No Applications yet.....</p>}
                </div>
              </div>


            </div>
          }
        </div>
      </div>

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

      <Footer />
    </>
  )
}

export default AdminCareers