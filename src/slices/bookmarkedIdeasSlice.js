import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../utils/constants";
import { fetchWrapper } from "../utils/fetchWrapper";
import { getTokenDetails } from "../utils/functions";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  value: []
}

const bookmarkedIdeasSlice = createSlice({
  name: 'bookmarkedIdeas',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    addToBookmarkedIdeas: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },

    logoutResetBookmarkedIdeas: (state, action) => {
      state.loading = false
      state.value = []
    }
  }
})

export const { setLoading, addToBookmarkedIdeas, logoutResetBookmarkedIdeas } = bookmarkedIdeasSlice.actions

export const getBookmarkedIdeasAsync = () => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`bookmarked_by=${getTokenDetails(localStorage.getItem('access_token')).user_id}`)
  queryParams.push(`offset=${getState().bookmarkedIdeas.value.length}`)
  queryParams.push(`ordering=-created_at`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IDEAS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(addToBookmarkedIdeas(resData?.results))
    }


  } catch (error) {
    console.log(error)
    dispatch(enqueueNotification({
      msg: "Failed to fetch bookmarked Ideas",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}

export const selectBookmarkedIdeas = state => state.bookmarkedIdeas.value
export const selectLoading = state => state.bookmarkedIdeas.loading

export default bookmarkedIdeasSlice.reducer