import React from 'react'
import Sidebar from '../../components/Sidebar'

function Profile() {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 transition duration-500" >
      <Sidebar />

      <div className="h-screen flex flex-1 flex-col " >
        <div className="px-5 py-2 h-14 w-full bg-white shadow-sm" >
        </div>

        <div >
          profile page
        </div>

      </div>


    </div>
  )
}

export default Profile
