import React from 'react'
import { Link } from 'react-router-dom'
import ThemeChangeFAB from '../../components/ThemeChangeFAB'
import { routes } from '../../utils/routeStrings'


const classes = {
  INPUT: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-700 dark:focus:bg-gray-600',
  BTN: 'mt-1 p-3 block w-full bg-blue-200 rounded hover:bg-blue-300 text-black font-semi-bold text-xl dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white '
}

function Signup() {
  return (
    <div className="flex w-screen h-screen dark:text-white">
      <div className="h-full w-full lg:w-1/2 flex items-center justify-center dark:bg-gray-800">

        <div className="w-10/12 md:w-8/12" >
          <h2 className="text-4xl mb-7" >
            SignUp
          </h2>
          <div>
            <div className="flex justify-between flex-wrap" >
              <label className="inline-block mb-5 w-full md:w-[49%] " >
                <span>First Name</span>
                <input type="text" className={classes.INPUT} />
              </label>
              <label className="inline-block mb-5 w-full md:w-[49%]" >
                <span>Last Name</span>
                <input type="text" className={classes.INPUT} />
              </label>
            </div>

            <label className="block mb-5" >
              <span>Email</span>
              <input type="email" className={classes.INPUT} />
            </label>

            <label className="block mb-5" >
              <span>Username</span>
              <input type="text" className={classes.INPUT} />
            </label>

            <label className="block mb-5" >
              <span>Password</span>
              <input type="password" className={classes.INPUT} />
            </label>

            <label className="block mb-10" >
              <span>Confirm Password</span>
              <input type="password" className={classes.INPUT} />
            </label>

            <button type="button" className={classes.BTN} >SignUp</button>
            <p className="w-full mt-7 text-sm text-center" >Don't have an account ? <Link to={routes.LOGIN} className="text-blue-500 hover:text-blue-400" >Login</Link> </p>
          </div>
        </div>

      </div>
      <div className="h-full hidden lg:block w-1/2 bg-blue-200 dark:bg-blue-900" ></div>

      <ThemeChangeFAB />

    </div>
  )
}

export default Signup