import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../../slices/authSlice"

function Header() {

  const dispatch = useDispatch()

  return (
    <div className="px-5 py-2 h-14 w-full flex-shrink-0 bg-white dark:bg-gray-800 shadow-xl flex justify-end" >
      <button type="button" onClick={() => dispatch(logout())} className=" block rounded-md border px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-white border-opacity-20 " >
        Logout
      </button>
    </div>
  )
}

export default Header
