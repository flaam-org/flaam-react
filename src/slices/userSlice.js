import { createSlice } from "@reduxjs/toolkit"
import { endpoints } from "../utils/constants";
import { fetchWrapper } from "../utils/fetchWrapper";

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
  favouriteTags: []
}



export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserState: (state, action) => {
      const { id, username, email, first_name, last_name, status, description, avatar } = action.payload;

      state.id = id
      state.username = username
      state.email = email
      state.firstName = first_name
      state.lastName = last_name
      state.status = status
      state.description = description
      state.avatar = avatar
      // state.favouriteTags = favourite_tags
    },

    setFavouriteTags: (state, action) => {
      state.favouriteTags = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})



export const { setUserState, setLoading, setFavouriteTags } = userSlice.actions




export const getUserAsync = () => async dispatch => {

  dispatch(setLoading(true));

  try {

    const res = await fetchWrapper.get(endpoints.USER_PROFILE, true)

    const resData = await res.json()

    if (res.ok) {
      dispatch(setUserState(resData))
      dispatch(getExpandedFavouriteTags(resData.favourite_tags))
    }

  }
  catch (err) {
    console.log(err)
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const getExpandedFavouriteTags = (tagIds) => async dispatch => {
  dispatch(setLoading(true))

  try {
    const ids = tagIds.join(',')
    const url = `${endpoints.FAVOURITE_TAGS}?ids=${ids}&limit=${tagIds.length}`

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



export const selectLoading = state => state.user.loading
export const selectUserId = state => state.user.id
export const selectUserName = state => state.user.username
export const selectFirstName = state => state.user.firstName
export const selectLastName = state => state.user.lastName
export const selectFullName = state => `${state.user.firstName} ${state.user.lastName}`
export const selectEmail = state => state.user.email
export const selectStatus = state => state.user.status
export const selectDescription = state => state.user.description
export const selectAvatar = state => state.user.avatar
export const selectFavouriteTags = state => state.user.favouriteTags
export const selectUser = state => {
  const { loading, ...u } = state.user

  return u
}


export default userSlice.reducer