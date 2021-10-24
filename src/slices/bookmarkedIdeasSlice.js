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

  const owner_id = getTokenDetails(localStorage.getItem('access_token')).user_id
  const offset = getState().bookmarkedIdeas.value.length

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IDEAS}?bookmarked_by=${owner_id}&offset={offset}&ordering=-created_at`, true)

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