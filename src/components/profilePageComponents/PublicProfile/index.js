import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { joinClassNames } from "../../../utils/functions"
import FavouriteTags from '../FavouriteTags'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import ProfilePicture from '../ProfilePicture'
import { useParams } from "react-router-dom"
import { getPublicUserAsync, selectFavouriteTags, selectLoading, selectPublicUser } from '../../../slices/publicUser'
import { setIsEditMode } from "../../../slices/userSlice"
import LoadingSpinner from '../../utilComponents/LoadingSpinner'


function PublicProfile() {

  // const isEditMode = useSelector(selectIsEditMode)
  const favouriteTags = useSelector(selectFavouriteTags)
  const user = useSelector(selectPublicUser)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  const [activeTags, setActiveTags] = useState(favouriteTags.map(t => ({ ...t, "active": true })))
  const [avatar, setAvatar] = useState(user.avatar)
  const { username } = useParams()

  useEffect(() => {
    dispatch(setIsEditMode(false))
  }, [dispatch])

  useEffect(() => {
    dispatch(getPublicUserAsync(username))
  }, [username, dispatch])

  useUpdateEffect(() => {
    setActiveTags(favouriteTags.map(t => ({ ...t, "active": true })))
  }, [favouriteTags])

  useUpdateEffect(() => {
    setAvatar(user.avatar)
  }, [user.avatar])


  return (
    <div className="w-full snap-mt-2 p-2 border snap-start" >

      {isLoading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingSpinner className="w-10 h-10 text-green-400 inline" />
          <span className="pl-2 text-green-700" >Loading</span>
        </div>
      ) : (
        <>
          <div className="flex" >
            <div className="flex flex-col items-center flex-1 p-2 " >

              <ProfilePicture avatar={avatar} setAvatar={setAvatar} />

              <p className="text-xl font-bold mt-3" >{user.username}</p>

              <FieldDisplay value={user.status} className="mt-2" />
            </div>

            <div className="flex flex-col flex-1 justify-center p-2 text-black/70" >

              <div className="flex gap-2" >

                <FieldDisplay label="First Name" value={user.firstName} />
                <FieldDisplay label="Last Name" value={user.lastName} />
              </div>

              <FieldDisplay label="Email" value={user.email} className="text-left" />
              <FieldDisplay label="description" value={user.description} />
            </div>
          </div>
          <FavouriteTags activeTags={activeTags} setActiveTags={setActiveTags} />

        </>
      )}



    </div>
  )
}

const FieldDisplay = ({ label, value, className }) => {
  return (
    <div className={joinClassNames(
      "flex flex-col p-2",
      className
    )} >
      <p className="text-sm font-bold" >{label}</p>
      <p className="" >{value}</p>
    </div>
  )
}


export default PublicProfile
