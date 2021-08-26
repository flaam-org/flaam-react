import { Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import ThemeChangeFAB from '../../components/ThemeChangeFAB'
import { routes } from '../../utils/routeStrings'
import * as Yup from "yup"
import { InputField } from '../../components/formComponents/Input'

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  confirm_password: ""
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("This field is required."),
  last_name: Yup.string(),
  email: Yup.string().required("This field is required.").email("not a valid email format."),
  username: Yup.string().required("This field is required."),
  password: Yup.string().required("This field is required."),
  confirm_password: Yup.string().required("This field is required.")
})


const classes = {
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            <Form>
              <div className="flex justify-between flex-wrap" >

                <InputField label="first name" name="first_name" type="text" labelClassName="inline-block mb-2 w-full md:w-[49%]" className="block mt-1 w-full" />

                <InputField label="last name" name="last_name" type="text" labelClassName="inline-block mb-2 w-full md:w-[49%]" className="block mt-1 w-full" />

              </div>

              <InputField label="email" name="email" type="email" labelClassName="block mb-2 w-full" className="block mt-1 w-full" />

              <InputField label="username" name="username" type="text" labelClassName="block mb-2 w-full" className="block mt-1 w-full" />

              <InputField label="password" name="password" type="password" labelClassName="block mb-2  w-full" className="block mt-1 w-full" />

              <InputField label="Confirm password" name="confirm_password" type="password" labelClassName="block mb-6 w-full" className="block mt-1 w-full" />

              <button type="submit" className={classes.BTN} >SignUp</button>

            </Form>
          </Formik>

          <p className="w-full mt-7 text-sm text-center" >Already have an account ? <Link to={routes.LOGIN} className="text-blue-500 hover:text-blue-400" >Login</Link> </p>

        </div>

      </div>
      <div className="h-full hidden lg:block w-1/2 bg-blue-200 dark:bg-blue-900" ></div>

      <ThemeChangeFAB />

    </div>
  )
}

export default Signup