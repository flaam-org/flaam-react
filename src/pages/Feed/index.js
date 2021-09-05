import React from 'react'
// import { useDispatch } from 'react-redux'
import Sidebar from '../../components/Sidebar'
// import {logout} from '../../slices/authSlice'
// import ThemeChangeFAB from "../../components/ThemeChangeFAB"

function Feed() {

  // const dispatch = useDispatch()

  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 transition duration-500" >
      <Sidebar />

      <div className="h-screen flex flex-1 flex-col" >
        <div className="px-5 py-2 h-14 w-full bg-white shadow-sm" >
        </div>
      </div>

      {/* <button type="button" onClick={() => dispatch(logout())}  className="border border-black p-3 bg-gray-200 rounded-md shadow-md"   >
        Logout
      </button> */}
      {/* <ThemeChangeFAB /> */}
    </div>
  )
}

export default Feed