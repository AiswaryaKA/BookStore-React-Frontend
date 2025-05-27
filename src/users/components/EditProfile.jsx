import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { updateUserProfileApi } from "../../services/allApi";
import { serverUrl } from "../../services/serverUrl";
import { userProfileUpdateStatusContext } from "../../context/Contextshare";


function EditProfile() {
  const [offcanvasStatus, setoffcanvasStatus] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    bio: "",
    profile: ""

  })
 // console.log(userDetails);

  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [existingProfileImage, setexistingProfileImage] = useState("")
  const [updateStatus, setupdateStatus] = useState({})
  const {setUserProfileUpdateStatus} = useContext(userProfileUpdateStatusContext)

  const handleFileAdd = (e) => {
    //console.log(e.target.files[0]);
    setUserDetails({ ...userDetails, profile: e.target.files[0] })
    // console.log(userDetails.profile);

    if (e.target.files[0] != "") {
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }

  }
 // console.log(preview);

  //reset function
  const handleReset = () => {
    setUserDetails({
      username: "",
      password: "",
      cPassword: "",
      bio: "",
      profile: ""
    })
    setPreview("")
  }
  //function to update
  const handleAdd = async () => {
    const { username, password, cPassword, profile, bio } = userDetails
    console.log(username, password, cPassword, profile, bio);

    if (!username || !password || !cPassword) {
      toast.info('Please add complete details')
    }
    else {

      if (password != cPassword) {
        toast.warning('password must match')
      }
      else {
        if (preview) {
          const reqBody = new FormData()

          for (let key in userDetails) {
            reqBody.append(key, userDetails[key])
          }

          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }


          const result = await updateUserProfileApi(reqBody, reqHeader)
          console.log(result);

          if (result.status == 200) {
            toast.success('Profile updated successfully')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setupdateStatus(result.data)
            setUserProfileUpdateStatus(result.data)
            
          }
          else {
            toast.error('Something went wrong')
            setupdateStatus(result)
          }

        }
        else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await updateUserProfileApi({ username, password, profile: existingProfileImage, bio }, reqHeader)
          console.log(result);

          if (result.status == 200) {
            toast.success('Profile updated successfully')
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setupdateStatus(result.data)
             setUserProfileUpdateStatus(result.data)
          }
          else {
            toast.error('Something went wrong')
            setupdateStatus(result)
          }
        }
      }



    }

  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({ username: user.username, password: user.password, cPassword: user.password , bio:user.bio})
      setexistingProfileImage(user.profile)
    }
  }, [updateStatus])

  return (
    <>
      <div>
        <button
          onClick={() => setoffcanvasStatus(true)}
          className="text-blue-600 border border-blue-600 rounded p-3 hover:bg-blue-600 hover:text-white"
        >
          {" "}
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit
        </button>
      </div>

      {offcanvasStatus && (
        <div>
          {/* to make background light */}
          <div
            onClick={() => setoffcanvasStatus(false)}
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
          ></div>
          {/* offcavas content */}
          <div className="bg-white h-full w-90 z-50 fixed top-0 left-0">
            {/* title od offcanvas */}
            <div className="bg-gray-900 text-white text-2xl px-3 py-4 flex justify-between">
              <h1>Edit User Profile</h1>
              <FontAwesomeIcon
                onClick={() => setoffcanvasStatus(false)}
                icon={faXmark}
              />
            </div>
            <div className="flex justify-center items-center  flex-col">
              <label htmlFor="profilefile" className="mt-10">
                <input
                  type="file" onChange={(e) => handleFileAdd(e)}
                  id="profilefile"
                  style={{ display: "none" }}
                  className=""
                />

                {existingProfileImage == "" ? <img
                  src={preview ? preview : "https://cdn-icons-png.freepik.com/512/8742/8742495.png"}
                  alt="no image"
                  style={{ height: "200px", width: "200px", borderRadius: '50%' }}
                /> :
                  <img
                    src={preview ? preview : `${serverUrl}/upload/${existingProfileImage}`}
                    alt="no image"
                    style={{ height: "200px", width: "200px", borderRadius: '50%' }}
                  />}

                <div className="bg-yellow-300 z-53 fixed text-white py-3 px-4 rounded" style={{ marginLeft: '135px', marginTop: '-50px' }}>
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </label>

              <div className="mb-3 w-full mt-5 px-5">
                <input type="text" value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} placeholder="Username" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
              </div>

              <div className="mb-3 w-full mt-5 px-5">
                <input type="text" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} placeholder="Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
              </div>

              <div className="mb-3 w-full mt-5 px-5">
                <input type="text" value={userDetails.cPassword} onChange={(e) => setUserDetails({ ...userDetails, cPassword: e.target.value })} placeholder="Conform Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
              </div>

              <div className="mb-3 w-full mt-5 px-5">
                <textarea type="text" value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} placeholder="Bio" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded"></textarea>
              </div>

              <div className="flex">
                <button onClick={handleReset} type="button" className="bg-amber-600 text-black rounded py-3 px-4 hover:text-amber-600 ">Reset</button>
                <button onClick={handleAdd} type="button" className="bg-green-600 text-black rounded py-3 px-4 hover:text-amber-600 ms-3">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer theme='colored' position="top-center" autoClose={2000} />
    </>
  );
}

export default EditProfile;