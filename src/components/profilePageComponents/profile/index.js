import React, { useState } from 'react'
import { PencilIcon } from "@heroicons/react/solid"
import { useSelector } from 'react-redux'
import {  selectFavouriteTags, selectUser } from '../../../slices/userSlice'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { AvailabilityCheckInput, InputField, TextAreaField } from '../../formComponents/Input'
import { joinClassNames } from "../../../utils/functions"
import FavouriteTags from '../FavouriteTags'
import useUpdateEffect from '../../../hooks/useUpdateEffect'



const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("This field is required"),
  last_name: Yup.string(),
  email: Yup.string().required("This field is required.").email("not a valid email format."),
  description: Yup.string(),
  status: Yup.string()
})



function Profile() {

  const [isEditMode, setIsEditMode] = useState(false)
  const favouriteTags = useSelector(selectFavouriteTags)
  const user = useSelector(selectUser)

  const [activeTags, setActiveTags] = useState(favouriteTags.map(t => ({ ...t, "active": true })))

  useUpdateEffect(() => {
    setActiveTags(favouriteTags.map(t => ({ ...t, "active": true })))
  }, [favouriteTags])


  const initialValues = {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    description: user.description,
    status: user.status,
  }


  return (
    <div className="w-full p-2 border " >
      <div className={joinClassNames(
        isEditMode ? "hidden" : "",
        "w-full py-2 px-10 flex flex-row-reverse cursor-pointer"
      )} onClick={() => setIsEditMode(true)} >
        <PencilIcon className="w-6 h-6 text-blue-600  " />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
        validateOnChange={true}
        onReset={(values) => {
          setIsEditMode(false)
          setActiveTags(prev => {
            return [...prev].map(t => ({ ...t, "active": true }))
          })
        }}

      >
        <Form>


          <div className="flex" >
            <div className="flex flex-col items-center flex-1 p-2 " >
              <div className="w-40 h-40 mb-3 rounded-full bg-gray-400 bg-cover  " style={{ background: `url("${user.avatar || "https://picsum.photos/400"}")` }} ></div>

              <p className="text-xl font-bold mt-3" >{user.username}</p>

              {/* <p className="text-black/50 text-sm font-bold" >{user.status}</p> */}
              <InputField
                label=""
                name="status"
                type="text"
                labelClassName=""
                labelSpanClassName=""
                className={joinClassNames(
                  isEditMode ? "" : "border-none shadow-none",
                  "text-black/50 font-bold w-32 text-center"
                )}
                disabled={!isEditMode}
              />
            </div>

            <div className="flex flex-col flex-1 justify-center p-2 text-black/70" >

              <div className="flex gap-2" >
                <InputField
                  label="first name"
                  name="first_name"
                  type="text"
                  labelClassName=""
                  labelSpanClassName=""
                  className={joinClassNames(
                    isEditMode ? "" : "",
                    "p-1 w-full"
                  )}
                  disabled={!isEditMode}
                  placeholder="First Name" />

                <InputField
                  label="last name"
                  name="last_name"
                  type="text"
                  labelClassName=" "
                  labelSpanClassName=""
                  className="p-1 w-full"
                  disabled={!isEditMode}
                />

              </div>

              <AvailabilityCheckInput
                label="email"
                name="email"
                type="email"
                labelClassName=""
                labelSpanClassName=""
                className="p-1"
                disabled={!isEditMode}
                placeholder="email"
              />


              <TextAreaField
                label="description"
                name="description"
                labelClassName=""
                className="p-1 text-sm w-full h-40 resize-none"
                placeholder="please describe yourself ..."
                disabled={!isEditMode}

              />
            </div>

          </div>

          <FavouriteTags activeTags={activeTags} setActiveTags={setActiveTags} isEditMode={isEditMode} />


          <div className={joinClassNames(isEditMode ? "" : "hidden", "flex justify-end px-3")} >
            <button className="py-2 px-3 border m-1 rounded-md shadow-md" type="reset" >cancel</button>
            <button className="py-2 px-3 border m-1 rounded-md shadow-md" type="submit">Save</button>
          </div>


        </Form>
      </Formik>




    </div>
  )
}

export default Profile
