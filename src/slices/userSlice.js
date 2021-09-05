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
      const { id, username, email, first_name, last_name, status, description, avatar, favourite_tags } = action.payload;

      state.id = id
      state.username = username
      state.email = email
      state.firstName = first_name
      state.lastName = last_name
      state.status = status
      state.description = description
      state.avatar = avatar
      state.favouriteTags = favourite_tags
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})



export const { setUserState, setLoading } = userSlice.actions




export const getUserAsync = () => async dispatch => {

  dispatch(setLoading(true));

  try {

    const res = await fetchWrapper.get(endpoints.USER_PROFILE,true)

    const resData = await res.json()

    if (res.ok) {
      dispatch(setUserState(resData))
    }

  }
  catch (err) {
    console.log(err)
  }
  finally {
    dispatch(setLoading(false))
  }
}




export const selectLoading = state => state.user.loading

export default userSlice.reducer