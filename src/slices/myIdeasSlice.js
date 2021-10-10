import { createSlice } from "@reduxjs/toolkit"
import { endpoints } from "../utils/constants";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  value: []
}

const myIdeasSlice = createSlice({
  name: 'myIdeas',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    addToMyIdeas: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },

  }
})

export const {setLoading,addToMyIdeas} = myIdeasSlice.actions

export const getMyIdeasAsync = () => async (dispatch, getState) => {

  const ownerId = getState().user.id
  const offset = getState().myIdeas.value.length

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IDEAS}?owner=${ownerId}&offset=${offset}`,true)

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
    setLoading(false)
  }

}


export const selectMyIdeas = state => state.myIdeas.value
export const selectLoading = state => state.myIdeas.loading

export default myIdeasSlice.reducer