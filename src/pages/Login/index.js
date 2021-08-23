import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import ThemeChangeFAB from '../../components/ThemeChangeFAB'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, selectLoading, selectLoginError, setLoginError } from "../../slices/authSlice"
import { XIcon } from "@heroicons/react/solid"


const classes = {
  INPUT: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-700 dark:focus:bg-gray-600',
  BTN: 'mt-1 p-3 block w-full bg-green-300 rounded hover:bg-green-400 text-black font-semi-bold text-xl dark:bg-green-600 dark:hover:bg-green-500 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed disabled:text-black/80'
}

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loginError = useSelector(selectLoginError)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()


  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(setLoginError(null))

    if (!username || !password) {
      dispatch(setLoginError("All fields are required."))

      console.error("all fields are required")
      return
    }

    console.log(username, password)

    dispatch(loginAsync(username, password))


  }


  return (
    <div className="flex w-screen h-screen dark:text-white ">
      <div className="h-full hidden lg:block w-1/2 bg-green-300 dark:bg-green-600" ></div>
      <div className="h-full w-full lg:w-1/2 flex items-center justify-center dark:bg-gray-800 ">




        <div className="w-10/12 md:w-8/12" >
          {!!loginError && (
            <div className="flex mb-10 text-center bg-red-500/30 px-3 py-2 rounded-md border border-red-500 text-red-600 text-lg " >
              <p className="w-11/12" >{loginError}</p>
              <div className="w-1/12 flex items-center justify-center" >
                <XIcon className="w-4/6 cursor-pointer" onClick={() => dispatch(setLoginError(null))} />
              </div>
            </div>
          )}
          <h2 className="text-4xl mb-10" >
            Login
          </h2>
          <form onSubmit={submitHandler} >
            <label className="block mb-5" >
              <span>Username</span>
              <input type="text" className={classes.INPUT} value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="block mb-10" >
              <span>Password</span>
              <input type="password" className={classes.INPUT} value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button type="submit" className={classes.BTN} disabled={loading}>
              {loading && (
                <span className="inline-block align-middle">
                  <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              )}

              <span className="inline-block align-middle">
                Login
              </span>
            </button>
            <p className="w-full mt-7 text-sm text-center" >Don't have an account ? <Link to={routes.SIGNUP} className="text-green-600 hover:text-green-500" >SignUp</Link> </p>
          </form>
        </div>

        <ThemeChangeFAB />

      </div>
    </div>
  )

}

export default Login