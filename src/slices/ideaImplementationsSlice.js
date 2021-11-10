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

const ideaImplementationsSlice = createSlice({
  name: 'ideaImplementations',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setIdeaImplementations: (state, action) => {
      state.value = action.payload
    },

    addToIdeaImplementations: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },

    logoutResetIdeaImplementations: (state, action) => {
      state.loading = false
      state.value = []
    }
  }
})


export const { setLoading, setIdeaImplementations, addToIdeaImplementations, logoutResetIdeaImplementations, setTotalCount } = ideaImplementationsSlice.actions

export const getIdeaImplementationsAsync = (ideaId) => async (dispatch, getState) => {
  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`idea=${ideaId}`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_IMPLEMENTATIONS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      console.log(resData)
      dispatch(setIdeaImplementations(resData.results))
      dispatch(setTotalCount(resData.count))
    }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch implementations.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}


export const getNextIdeaImplementationsAsync = (ideaId) => async (dispatch, getState) => {
  const { value, totalCount } = getState().ideaImplementations

  if (value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${value.length}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`idea=${ideaId}`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_IMPLEMENTATIONS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      console.log(resData)
      dispatch(addToIdeaImplementations(resData.results))
    }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch implementations.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}


export const selectIdeaImplementations = state => state.ideaImplementations.value
export const selectLoading = state => state.ideaImplementations.loading

export default ideaImplementationsSlice.reducer