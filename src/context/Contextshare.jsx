import React, { createContext, useState } from 'react'

export const searchKeyContext = createContext('')
export const adminProfileUpdateStatusContext = createContext("")
export const userProfileUpdateStatusContext = createContext("")

function Contextshare({ children }) {

    const [searchkey, setsearchkey] = useState("")
    const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState({})
    const [userProfileUpdateStatus, setUserProfileUpdateStatus] = useState({})


    return (

       <userProfileUpdateStatusContext.Provider value={{userProfileUpdateStatus , setUserProfileUpdateStatus}}>
            <adminProfileUpdateStatusContext.Provider value={{ adminProfileUpdateStatus, setAdminProfileUpdateStatus }}>
                <searchKeyContext.Provider value={{ searchkey, setsearchkey }}>
    
                    {
                        children
                    }
                </searchKeyContext.Provider>
            </adminProfileUpdateStatusContext.Provider>
       </userProfileUpdateStatusContext.Provider>
    )
}

export default Contextshare