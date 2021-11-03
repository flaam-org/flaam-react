import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../utils/constants";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  currentImplementation: {},
}

const ImplementationSlice = createSlice({
  name: 'implementation',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setCurrentImplementation: (state, action) => {
      state.currentImplementation = action.payload
    },

    setCurrentImplementationVote: (state, action) => {
      state.currentImplementation.vote = action.payload
    },

    addToUpVoteCount: (state, action) => {
      state.currentImplementation.upvote_count += action.payload
    },

    addToDownVoteCount: (state, action) => {
      state.currentImplementation.downvote_count += action.payload
    },

    logoutReset: (state, action) => {
      state.loading = false
      state.currentImplementation = {}
    }
  }
})

export const { setLoading, logoutReset, setCurrentImplementation, setCurrentImplementationVote, addToUpVoteCount, addToDownVoteCount } = ImplementationSlice.actions;


export const postImplementationAsync = (implementation) => async dispatch => {
  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(endpoints.GET_POST_IMPLEMENTATIONS, implementation, true)

    const resData = await res.json()

    if (res.ok) {
      dispatch(enqueueNotification({
        msg: "Implementation created successfully",
        type: "success",
        duration: 3000
      }))

      return resData
    }



  } catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Could not create implementation. pls Retry.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}

export const getSingleImplementationAsync = (implementationId) => async dispatch => {

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(endpoints.SINGLE_IMPLEMENTATION(implementationId), true)

    const resData = await res.json()

    if (res.ok) {

      dispatch(setCurrentImplementation(resData))
    }

  } catch (error) {
    console.log(error);
    dispatch(enqueueNotification({
      msg: "Something went wrong,Retry",
      type: "error",
      duration: 2000
    }))
  } finally {
    dispatch(setLoading(false))
  }

}

export const updateImplementationAsync = (implementationId, implementation) => async dispatch => {


  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.put(endpoints.SINGLE_IMPLEMENTATION(implementationId), implementation, true)

    // const resData = await res.json()

    if (res.ok) {
      dispatch(enqueueNotification({
        msg: "Implementation has been updated.",
        type: "success",
        duration: 2500
      }))

      // TODO update every place where this idea is being stored using `resData`

    }

  } catch (error) {
    console.log(error)
    dispatch(enqueueNotification({
      msg: "Update failed.",
      type: "error",
      duration: 2000
    }))

  } finally {
    dispatch(setLoading(false))
  }

}

export const deleteImplementationAsync = (implementationId) => async dispatch => {

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper._delete(endpoints.SINGLE_IMPLEMENTATION(implementationId), true)

    const resData = await res.json()

    if (resData.ok) {
      dispatch(enqueueNotification({
        msg: `Deleted ${resData?.title} successfully.`,
        type: "success",
        duration: 2000
      }))
    }

    return res

  } catch (error) {
    console.log(error);
    dispatch(enqueueNotification({
      msg: "Something went wrong (Could not delete)",
      type: "error",
      duration: 3000
    }))
  }

}



export const setImplementationVoteAsync = (implementationId, vote, upDiff, downDiff) => async dispatch => {

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(`${endpoints.VOTE_SINGLE_IMPLEMENTATION(implementationId)}?value=${vote}`, {}, true)

    if (res.ok) {

      dispatch(setCurrentImplementationVote(vote))
      dispatch(addToUpVoteCount(upDiff))
      dispatch(addToDownVoteCount(downDiff))

    }

  }
  catch (err) {
    console.log(err)
  }
  finally {
    dispatch(setLoading(false))
  }

}


export const selectCurrentImplementation = state => state.implementation.currentImplementation
export const selectLoading = state => state.implementation.loading

export default ImplementationSlice.reducer