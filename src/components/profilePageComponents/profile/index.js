import React, { useState } from 'react'
import { PencilIcon } from "@heroicons/react/solid"
import { useDispatch, useSelector } from 'react-redux'
import { selectFavouriteTags, selectIsEditMode, setIsEditMode, selectUser, updateUserAsync, selectLoading } from '../../../slices/userSlice'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { AvailabilityCheckInput, InputField, TextAreaField } from '../../formComponents/Input'
import { joinClassNames } from "../../../utils/functions"
import FavouriteTags from '../FavouriteTags'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import ProfilePicture from '../ProfilePicture'
import Button from '../../utilComponents/Button'


const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("This field is required"),
  last_name: Yup.string(),
  email: Yup.string().required("This field is required.").email("not a valid email format."),
  description: Yup.string(),
  status: Yup.string()
})

function Profile() {

  const isEditMode = useSelector(selectIsEditMode)
  const favouriteTags = useSelector(selectFavouriteTags)
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  const [activeTags, setActiveTags] = useState(favouriteTags.map(t => ({ ...t, "active": true })))
  const [avatar, setAvatar] = useState(user.avatar)

    useUpdateEffect(() => {
      setActiveTags(favouriteTags.map(t => ({ ...t, "active": true })))
    }, [favouriteTags])

  useUpdateEffect(() => {
    setAvatar(user.avatar)
  }, [user.avatar])


  const initialValues = {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    description: user.description,
    status: user.status,
    favouriteTagsIds: user.favouriteTagsIds
  }



  return (
    <div className="w-full snap-mt-2 p-2 border dark:border-gray-100/20 snap-start dark:text-white" >
      <div className={joinClassNames(
        isEditMode ? "hidden" : "",
        "w-full py-2 px-10 flex flex-row-reverse cursor-pointer"
      )} onClick={() => dispatch(setIsEditMode(true))} >
        <PencilIcon className="w-6 h-6 text-blue-600  " />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const favourite_tags = activeTags.filter(t => t.active === true).map(t => t.id)
          dispatch(updateUserAsync({ ...values, favourite_tags, avatar }))
        }}
        validateOnChange={true}
        onReset={(values) => {
          dispatch(setIsEditMode(false))
          setActiveTags(prev => {
            return [...prev].map(t => ({ ...t, "active": true }))
          })
          setAvatar(user.avatar)
        }}
        enableReinitialize

      >
        <Form>


          <div className="flex" >
            <div className="flex flex-col items-center flex-1 p-2 " >

              <ProfilePicture avatar={avatar} setAvatar={setAvatar} />

              <p className="text-xl font-bold mt-3" >{user.username}</p>

              <InputField
                label=""
                name="status"
                type="text"
                labelClassName=""
                labelSpanClassName=""
                className={joinClassNames(
                  isEditMode ? "" : "border-none shadow-none",
                  "text-black/50 font-bold w-32 text-center dark:text-white/50"
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
                  labelClassName="dark:text-white"
                  labelSpanClassName=""
                  className={joinClassNames(
                    isEditMode ? "" : "",
                    "p-1 w-full dark:text-gray-300"
                  )}
                  disabled={!isEditMode}
                  placeholder="First Name" />

                <InputField
                  label="last name"
                  name="last_name"
                  type="text"
                  labelClassName=" dark:text-white"
                  labelSpanClassName=""
                  className="p-1 w-full dark:text-gray-300"
                  disabled={!isEditMode}
                />

              </div>

              <AvailabilityCheckInput
                label="email"
                name="email"
                type="email"
                labelClassName="dark:text-white"
                labelSpanClassName=""
                className="p-1 dark:text-gray-300"
                disabled={!isEditMode}
                placeholder="email"
              />


              <TextAreaField
                label="description"
                name="description"
                labelClassName="dark:text-white"
                className="p-1 text-sm w-full h-40 resize-none dark:text-gray-300"
                placeholder="please describe yourself ..."
                disabled={!isEditMode}

              />
            </div>

          </div>

          <FavouriteTags activeTags={activeTags} setActiveTags={setActiveTags} />


          <div className={joinClassNames(isEditMode ? "" : "hidden", "flex justify-end px-3")} >
            <Button variant="outline-danger" type="reset" className="my-1" >Cancel</Button>
            <Button variant="primary" type="submit" className="my-1 ml-3" loading={isLoading} disabled={isLoading} >Save</Button>
          </div>


        </Form>
      </Formik>
    </div>
  )
}

export default Profile
