import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../slices/authSlice'

function Feed() {

  const dispatch = useDispatch()

  return (
    <div className="bg-green-300 w-40 h-40 p-5" >
      FEED PAGE

      <button type="button" onClick={() => dispatch(logout())}  className="border border-black p-3 bg-gray-200 rounded-md shadow-md"   >
        Logout
      </button>
    </div>
  )
}

export default Feed