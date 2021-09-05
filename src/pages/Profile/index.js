import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'

function Profile() {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 transition duration-500" >
      <Sidebar />

      <main className="h-screen flex flex-1 flex-col">
        <Header />
        <div>
          Post idea page
        </div>

      </main>


    </div>
  )
}

export default Profile
