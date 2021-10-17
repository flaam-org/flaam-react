import { createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../utils/fetchWrapper"
import { manageLoginAsync } from "./authSlice"
import { endpoints } from "../utils/constants"
import { enqueueNotification } from "./globalNotificationSlice"

const initialState = {
  loading: false,
  value: []
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    addToFeed: (state, action) => {
      state.value = [...state.value, ...action.payload]
    }

  }
})

export const { setLoading, addToFeed } = feedSlice.actions

export const getFeedAsync = () => async dispatch => {
  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IDEAS}?ordering=-created_at`, true)


    if (res.ok) {

      const resData = await res.json()

      dispatch(addToFeed(resData?.results))

    }

  } catch (err) {
    console.log(err)
    enqueueNotification({
      msg: "Failed to load feed",
      type: "error",
      duration: 3000
    })
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const selectFeed = state => state.feed.value
export const selectLoading = state => state.feed.loading

export default feedSlice.reducer