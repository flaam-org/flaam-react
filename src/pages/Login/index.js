import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import ThemeChangeFAB from '../../components/ThemeChangeFAB'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, selectLoading, selectLoginError, setLoginError } from "../../slices/authSlice"
import { XIcon } from "@heroicons/react/solid"
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { InputField } from '../../components/formComponents/Input'
import LoadingSpinner from '../../components/utilComponents/LoadingSpinner'


const classes = {
  INPUT: (error, touched) => {
    const common = "block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:focus:bg-gray-600"

    if (error && touched) {
      return `border-red-500/50 ${common} `
    }
    else {
      return `${common} border-gray-300 dark:border-gray-700 `
    }
  },

  BTN: 'mt-1 p-3 block w-full bg-green-300 rounded hover:bg-green-400 text-black font-semi-bold text-xl dark:bg-green-600 dark:hover:bg-green-500 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed disabled:text-black/80'
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("This field is required."),
  password: Yup.string().required("This field is required.")
})


function Login() {

  const loginError = useSelector(selectLoginError)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()


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

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => dispatch(loginAsync(values))}
            validationSchema={validationSchema}
          >
              <Form>

                <InputField label="username" name="username" type="text" labelClassName="block mb-3" className="w-full mt-1" />

                <InputField label="password" name="password" type="password" labelClassName="block mb-6" className="w-full mt-1" />

                <button type="submit" className={classes.BTN} disabled={loading}>
                  {loading && <LoadingSpinner />}

                  <span className="inline-block align-middle">
                    Login
                  </span>
                </button>
                <p className="w-full mt-7 text-sm text-center" >Don't have an account ? <Link to={routes.SIGNUP} className="text-green-600 hover:text-green-500" >SignUp</Link> </p>
              </Form>

          </Formik>

        </div>

        <ThemeChangeFAB />

      </div>
    </div>
  )

}

export default Login