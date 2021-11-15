import { createSlice } from "@reduxjs/toolkit"
import { endpoints } from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";

const initialState = {
  loading: false,
  id: null,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  status: "",
  description: "",
  avatar: "",
  favouriteTagIds: [],
  favouriteTags: []
}


export const publicUserSlice = createSlice({
  name: 'publicUser',
  initialState: initialState,
  reducers: {
    setPublicUserState: (state, action) => {
      const { id, username, email, first_name, last_name, status, description, avatar, favourite_tags } = action.payload;

      state.id = id
      state.username = username
      state.email = email
      state.firstName = first_name
      state.lastName = last_name
      state.status = status
      state.description = description
      state.avatar = avatar
      state.favouriteTagIds = favourite_tags
    },

    setFavouriteTags: (state, action) => {
      state.favouriteTags = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },
  }
})


export const { setPublicUserState, setLoading, setFavouriteTags } = publicUserSlice.actions;




export const getPublicUserAsync = (username) => async dispatch => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(endpoints.PUBLIC_USER(username), true)

    const resData = await res.json()

    if (res.ok) {
      dispatch(setPublicUserState(resData))
      dispatch(getExpandedFavouriteTags(resData.favourite_tags))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(setLoading(false))
  }
}


export const getExpandedFavouriteTags = (tagIds) => async dispatch => {

  if (tagIds.length === 0) return dispatch(setLoading(false))

  dispatch(setLoading(true))

  try {
    const ids = tagIds.join(',')
    const url = `${endpoints.FAVOURITE_TAGS}?ids=${ids}&limit=${tagIds.length}`

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(url, true)
    const resData = await res.json()

    if (res.ok) {
      dispatch(setFavouriteTags(resData.results))
    }

  } catch (error) {
    console.log(error)
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const selectLoading = state => state.publicUser.loading
export const selectUserId = state => state.publicUser.id
export const selectUserName = state => state.publicUser.username
export const selectFirstName = state => state.publicUser.firstName
export const selectLastName = state => state.publicUser.lastName
export const selectFullName = state => `${state.publicUser.firstName} ${state.publicUser.lastName}`
export const selectEmail = state => state.publicUser.email
export const selectStatus = state => state.publicUser.status
export const selectDescription = state => state.publicUser.description
export const selectAvatar = state => state.publicUser.avatar
export const selectFavouriteTags = state => state.publicUser.favouriteTags
export const selectFavouriteTagIds = state => state.publicUser.favouriteTagIds
export const selectPublicUser = state => {
  const { loading, ...u } = state.publicUser

  return u
}


export default publicUserSlice.reducer