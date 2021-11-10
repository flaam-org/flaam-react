import { createSlice } from "@reduxjs/toolkit"
import { endpoints } from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { getTokenDetails } from "../utils/functions";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  totalCount: 0,
  value: []
}

const myIdeasSlice = createSlice({
  name: 'myIdeas',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setMyIdeas: (state, action) => {
      state.value = action.payload
    },

    addToMyIdeas: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },

    logoutResetMyIdeas: (state, action) => {
      state.loading = false
      state.totalCount = 0
      state.value = []
    }

  }
})

export const { setLoading, addToMyIdeas, logoutResetMyIdeas, setMyIdeas,setTotalCount } = myIdeasSlice.actions

export const getMyIdeasAsync = () => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`owner=${getTokenDetails(localStorage.getItem('access_token')).user_id}`)
  queryParams.push(`offset=${0}`)
  queryParams.push('ordering=-created_at')
  queryParams.push(`limit=${5}`)

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_IDEA}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(setMyIdeas(resData?.results))
      dispatch(setTotalCount(resData?.count))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch ideas",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}

export const getNextMyIdeasAsync = () => async (dispatch,getState) => {

  const {value,totalCount} = getState().myIdeas

  if(value.length === totalCount) return

  const queryParams = []
  queryParams.push(`owner=${getTokenDetails(localStorage.getItem('access_token')).user_id}`)
  queryParams.push(`offset=${value.length}`)
  queryParams.push('ordering=-created_at')
  queryParams.push(`limit=${10}`)

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_IDEA }?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(addToMyIdeas(resData?.results))

    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch ideas",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const selectMyIdeas = state => state.myIdeas.value
export const selectLoading = state => state.myIdeas.loading

export default myIdeasSlice.reducer