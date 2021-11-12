import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";


const initialState = {
  loading: false,
  totalCount: 0,
  value: []
}

const discussionCommentsSlice = createSlice({
  name: 'discussionComments',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setDiscussionComments: (state, action) => {
      state.value = action.payload
    },

    addToDiscussionComments: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },

    logoutResetDiscussionComments: (state, action) => {
      state.loading = false
      state.value = []
    }
  }
})


export const { setLoading, setDiscussionComments, addToDiscussionComments, logoutResetDiscussionComments, setTotalCount } = discussionCommentsSlice.actions

export const getDiscussionCommentsAsync = (discussionId) => async (dispatch, getState) => {
  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`discussion=${discussionId}`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_DISCUSSION_COMMENT}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      console.log(resData)
      dispatch(setDiscussionComments(resData.results))
      dispatch(setTotalCount(resData.count))
    }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch Comments.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}


export const getNextDiscussionCommentsAsync = (discussionId) => async (dispatch, getState) => {
  const { value, totalCount } = getState().discussionComments

  if (value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${value.length}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`discussion=${discussionId}`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_DISCUSSION_COMMENT}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      console.log(resData)
      dispatch(addToDiscussionComments(resData.results))
    }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch comments.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}


export const selectDiscussionComments = state => state.discussionComments.value
export const selectLoading = state => state.discussionComments.loading

export default discussionCommentsSlice.reducer