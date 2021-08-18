import React from 'react'
import { Link } from 'react-router-dom'
import {routes} from '../../utils/routeStrings'

const classes = {
  INPUT: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
  BTN: 'mt-1 p-3 block w-full bg-green-300 rounded hover:bg-green-400 text-black font-semi-bold text-xl'
}

function Login() {




  return (
    <div className="flex w-screen h-screen">
      <div className="h-full hidden lg:block w-1/2 bg-green-300" ></div>
      <div className="h-full w-full lg:w-1/2 flex items-center justify-center ">

        <div className="w-10/12 md:w-8/12" >
          <h2 className="text-4xl mb-10" >
            Login
          </h2>
          <div>
            <label className="block mb-5" >
              <span>Username</span>
              <input type="text" className={classes.INPUT} />
            </label>
            <label className="block mb-10" >
              <span>Password</span>
              <input type="password" className={classes.INPUT} />
            </label>

            <button type="button" className={classes.BTN} >Login</button>
            <p className="w-full mt-7 text-sm text-center" >Don't have an account ? <Link to={routes.SIGNUP} className="text-green-600 hover:text-green-500" >SignUp</Link> </p>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Login