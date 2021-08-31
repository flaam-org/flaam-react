import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import ThemeChangeFAB from '../../components/ThemeChangeFAB'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, selectLoading, selectLoginError, setLoginError } from "../../slices/authSlice"
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { InputField } from '../../components/formComponents/Input'
import LoadingSpinner from '../../components/utilComponents/LoadingSpinner'
import Alert from '../../components/utilComponents/Alert'


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
    <div className="w-full min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 grid-rows-1 dark:text-white">

      <div className="min-h-[100vh] flex-grow hidden lg:block bg-green-300 dark:bg-green-600" />
      <div className="min-h-[100vh] flex-grow flex items-center justify-center dark:bg-gray-800 py-10" >

        <div className="w-10/12 md:w-8/12" >

        <Alert message={loginError} onClose={() => dispatch(setLoginError(""))} />

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