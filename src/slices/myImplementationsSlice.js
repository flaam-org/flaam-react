import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../utils/constants";
import { fetchWrapper } from "../utils/fetchWrapper";
import { getTokenDetails } from "../utils/functions";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";


const initialState = {
  loading: false,
  totalCount:0,
  value: []
}

const myImplementationsSlice = createSlice({
  name: 'myImplementations',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setMyImplementations:(state,action) => {
      state.value = action.payload
    },

    addToMyImplementations:(state,action) => {
      state.value = [...state.value,...action.payload]
    },

    setTotalCount:(state,action) => {
      state.totalCount = action.payload
    },

    logoutResetMyImplementations: (state, action) => {
      state.loading = false
      state.value = []
    }
  }
})


export const { setLoading, logoutResetMyImplementations,setMyImplementations,addToMyImplementations,setTotalCount } = myImplementationsSlice.actions

export const getMyImplementationsAsync = () => async (dispatch, getState) => {
  const queryParams = []
  queryParams.push(`owner=${getTokenDetails(localStorage.getItem('access_token')).user_id}`)
  queryParams.push(`offset=${0}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IMPLEMENTATIONS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      console.log(resData)
      dispatch(setMyImplementations(resData.results))
      dispatch(setTotalCount(resData.count))
    }

  } catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch your implementations.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}


export const getNextMyImplementationsAsync = () => async (dispatch, getState) => {
  const {value,totalCount} = getState().myImplementations

  if(value.length === totalCount) return

  const queryParams = []
  queryParams.push(`owner=${getTokenDetails(localStorage.getItem('access_token')).user_id}`)
  queryParams.push(`offset=${value.length}`)
  queryParams.push(`limit=${10}`)
  queryParams.push(`ordering=-created_at`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IMPLEMENTATIONS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      console.log(resData)
      dispatch(addToMyImplementations(resData.results))
    }

  }catch(err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch your implementations.",
      type: "error",
      duration: 3000
    }))
  }
  finally{
    dispatch(setLoading(false))
  }

}


export const selectMyImplementations = state => state.myImplementations.value
export const selectLoading = state => state.myImplementations.loading

export default myImplementationsSlice.reducer