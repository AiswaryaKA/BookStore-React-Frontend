import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { addApplicationApi, getAllJobsApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'


function Careers() {

    const [modalstatus, setmodalstatus] = useState(false)
    const [allJobs, setallJobs] = useState("")
    const [searchKey, setsearchKey] = useState("")
    const [applicationDetails, setApplicationDetails] = useState({
        fullname: "",
        email: "",
        phone: "",
        qualification: "",
        coverletter: "",
        resume: ""
    })

    //console.log(applicationDetails);

    const [jobTitle, setJobTitle] = useState("")
    const [token , setToken] = useState("")

    //open modal
    const openModal = (jobTitle) => {

        //console.log(jobTitle);

        setmodalstatus(true)
        setJobTitle(jobTitle)
    }

    //function to get all jobs
    const getAllJobs = async (searchKey) => {
        const result = await getAllJobsApi(searchKey)
        console.log(result);

        if (result.status == 200) {
            setallJobs(result.data)
        }

    }

    const handleReset = () => {
        setApplicationDetails({
            fullname: "",
            email: "",
            phone: "",
            qualification: "",
            coverletter: "",
            resume: ""
        })
        //modern browsers
        document.getElementById('fileInput').value = ""
    }
    //function to add application
    const handleSubmit = async () => {
        // console.log(jobTitle);

        const { fullname, email, phone, qualification, coverletter, resume } = applicationDetails

        if (!fullname || !email || !phone || !qualification || !coverletter || !resume) {
            toast.info('Please fill the fileds completely')

        }
        else {
            //alert('proceed')

            const reqBody = new FormData()

            for (let key in applicationDetails) {
                reqBody.append(key, applicationDetails[key])
            }
            reqBody.append("jobtitle", jobTitle)

            const reqHeader = {
                'Authorization': `Bearer ${token}`
            }

            const result = await addApplicationApi(reqBody, reqHeader)
            console.log(result);

            if(result.status == 200){
                toast.success('Appplication submited successfully')
                setmodalstatus(false)
                handleReset()
            }
            else if(result.status == 400){
                toast.warning(result.response.data)
                handleReset()
            }
            elseP
            toast.error('something went wrong')
            setmodalstatus(false)
            handleReset()

        }

    }

    useEffect(() => {
        getAllJobs(searchKey)
        if(sessionStorage.getItem("token")){
            setToken(sessionStorage.getItem("token"))
        }
    }, [searchKey])
    return (
        <>
            <Header />

            <div className='flex justify-center items-center flex-col md:px-40 px-10'>
                <h1 className='my-5 text-3xl font-medium'>Careers</h1>
                <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, molestiae! Vero nulla quibusdam excepturi labore quia dolorem expedita earum, eaque asperiores, consequuntur perferendis animi sit laborum repellendus odio, incidunt alias?</p>

            </div>

            <div className='md:p-20 p-5'>
                <h1 className='text-2xl'>Current Openings</h1>
                <div className='flex my-8 w-full justify-center items-center'>

                    <input value={searchKey} onChange={(e) => setsearchKey(e.target.value)} type="text" placeholder='Job Title' className='border border-gray-200 placeholder:gray-200 p-2 md:w-1/4 w-1/2' />

                    <button className='bg-green-900 text-white py-2 px-3 shadow hover:border hover:border-green-900 hover:text-green-900 hover:bg-white'>Search</button>

                </div>

                <div className='md:px-20 p-5'>
                    {
                        allJobs?.length > 0 ?
                            allJobs?.map((item, index) => (
                                <div className='shadow border border-gray-200 mt-5' key={index}>
                                    <div className='md:grid grid-cols-[8fr_1fr] p-5 '>
                                        <div>
                                            <h1 className='mb-3'>{item?.title}</h1>
                                            <hr />
                                            <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='text-blue-800 me-3' />{item?.location}</p>
                                            <p className='mt-3'>job Type :{item?.jType}</p>
                                            <p className='mt-3'>Salary :{item?.salary}</p>
                                            <p className='mt-3'> Qualification:{item?.qualification}</p>
                                            <p className='mt-3'>Experience : {item?.experience}</p>
                                            <p className='text-justify'>Description : {item?.description}</p>
                                        </div>
                                        <div className='flex md:justify-center items-start justify-end'>
                                            <button onClick={() => openModal(item?.title)} className='bg-blue-800 text-white mt-5 md:mt-0 p-3 rounded ms-3 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800'>Apply<FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ms-1' /></button>
                                        </div>

                                    </div>

                                </div>
                            ))
                            :
                            <p>No Job openings</p>
                    }

                </div>
            </div>


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
                                <div className="grid grid-cols-2">
                                    <div className='p-3'>
                                        <div className="mb-3">
                                            <input type="text" value={applicationDetails.fullname} onChange={(e) => setApplicationDetails({ ...applicationDetails, fullname: e.target.value })} placeholder='Full Name' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" value={applicationDetails.email} onChange={(e) => setApplicationDetails({ ...applicationDetails, email: e.target.value })} placeholder='Email Id' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>

                                    </div>
                                    <div className='p-3'>
                                        <div className="mb-3">
                                            <input type="text" value={applicationDetails.qualification} onChange={(e) => setApplicationDetails({ ...applicationDetails, qualification: e.target.value })} placeholder='Qualification' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" value={applicationDetails.phone} onChange={(e) => setApplicationDetails({ ...applicationDetails, phone: e.target.value })} placeholder='Phone' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>

                                    </div>

                                </div>

                                <div className="mb-3 px-3 w-full">
                                    <textarea name="" id="" value={applicationDetails.coverletter} onChange={(e) => setApplicationDetails({ ...applicationDetails, coverletter: e.target.value })} placeholder='Cover Letter' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full'></textarea>
                                </div>
                                <div className="mb-3 px-3 w-full">
                                    <p className='text-gray-400' >resume</p>
                                    <input type="file" id='fileInput' onChange={(e) => setApplicationDetails({ ...applicationDetails, resume: e.target.files[0] })} className='border border-gray-400 rounded placeholder-gray-500 w-full file:bg-gray-400 file:p-2 file:text-white' />
                                </div>
                            </div>

                            {/* footer of modal */}
                            <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handleSubmit} type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border-gray-300">Submit</button>
                                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black" onClick={handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}


            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
            <Footer />
        </>
    )
}

export default Careers