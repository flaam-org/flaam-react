import { createSlice } from "@reduxjs/toolkit"
import { endpoints } from "../utils/endpoints"
import { fetchWrapper } from "../utils/fetchWrapper"
import { manageLoginAsync } from "./authSlice"
import { enqueueNotification } from "./globalNotificationSlice"

const initialState = {
  loading: false,
  totalCount: 0,
  value: []
}

const implementationComments = createSlice({
  name: "implementationComments",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },

    setImplementationComments: (state, action) => {
      state.value = action.payload
    },

    addToImplementationComments: (state, action) => {
      state.value = [...state.value, action.payload]
    },

    addNewImplementationComment: (state, action) => {
      state.value = [action.payload, ...state.value]
      state.totalCount += 1
    },

    resetImplementationComments: (state, action) => {
      state.value = []
      state.loading = false
      state.totalCount = 0
    }

  }

})


export const { setLoading, setImplementationComments, addNewImplementationComment, addToImplementationComments, setTotalCount, resetImplementationComments } = implementationComments.actions


export const getImplementationCommentsAsync = (implementationId) => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`implementation=${implementationId}`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_IMPLEMENTATION_COMMENTS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(setImplementationComments(resData.results))
      dispatch(setTotalCount(resData.count))
    }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      message: "Failed to fetch comments",
      type: "error",
      duration: 3000
    }))
  } finally {
    dispatch(setLoading(false))
  }

}

export const getNextImplementationCommentsAsync = (implementationId) => async (dispatch, getState) => {

  const { value, totalCount } = getState().implementationComments

  if (value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${value.length}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`implementation=${implementationId}`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_IMPLEMENTATION_COMMENTS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(addToImplementationComments(resData.results))
    }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      message: "Failed to fetch comments",
      type: "error",
      duration: 3000
    }))
  } finally {
    dispatch(setLoading(false))
  }

}

export const postCommentAsync = (implementationId, comment) => async (dispatch, getState) => {

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(
      `${endpoints.POST_POST_IMPLEMENTATION_COMMENTS}`,
      {
        implementation: implementationId,
        body: comment
      },
      true
    )

    const resData = await res.json()

    if (res.ok) {
      dispatch(addNewImplementationComment(resData))

    }

    return { status: res.status, data: resData }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      message: "Failed to post comment",
      type: "error",
      duration: 3000
    }))
  } finally {
    dispatch(setLoading(false))
  }

}

export const selectImplementationComments = state => state.implementationComments.value
export const selectLoading = state => state.implementationComments.loading

export default implementationComments.reducer