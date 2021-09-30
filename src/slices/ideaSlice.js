import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../utils/constants";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  currentIdea: {},
  feed: []
}

const IdeaSlice = createSlice({
  name: 'idea',
  initialState: initialState,
  reducers: {

    setLoading: (state, action) => {
      state.loading = action.payload
    }


  }

})

export const { setLoading } = IdeaSlice.actions;


// TODO make thunk for generating the feed


export const PostIdeaAsync = (idea) => async dispatch => {

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(endpoints.POST_IDEA, idea, true)

    // const resData = await res.json()

    if (res.ok) {
      dispatch(enqueueNotification({
        msg: "Idea has been posted",
        type: "success",
        duration: 3000
      }))
    }


  } catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Could not Post the Idea pls Retry.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}

export const getSingleIdeaAsync = (ideaId) => async dispatch => {

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(endpoints.GET_SINGLE_IDEA(ideaId), true)

    // const resData = await res.json()

    if (res.ok) {
      /**
       * -> set this resData to a state and use it to display full
       * details of the idea
       *
       * -> use it to fill the initial state
       * of the edit idea form
       *
       */
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

export const updateIdeaAsync = (ideaId, idea) => async dispatch => {


  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.put(endpoints.UPDATE_SINGLE_IDEA(ideaId), idea, true)

    // const resData = await res.json()

    if (res.ok) {
      dispatch(enqueueNotification({
        msg: "Idea has been updated.",
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
    setLoading(false)
  }

}

export const deleteIdeaAsync = (ideaId) => async dispatch => {

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper._delete(endpoints.DELETE_SINGLE_IDEA(ideaId), true)

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




export const addIdeaToBookmarksAsync = (ideaId) => async dispatch => {

  try {
    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(endpoints.ADD_IDEA_TO_BOOKMARKS(ideaId), {}, true)

    if (res.ok) {

      dispatch(enqueueNotification({
        msg: `Added Idea to BookMarks`,
        type: "success",
        duration: 2000
      }))

    }

    return res


  } catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Bookmarking Idea Failed.",
      type: "error",
      duration: 3000
    }))
  }

}

export const deleteIdeaFromBookmarkAsync = (ideaId) => async dispatch => {

  try {
    await dispatch(manageLoginAsync())
    const res = await fetchWrapper._delete(endpoints.DELETE_IDEA_FROM_BOOKMARKS(ideaId), true)

    if (res.ok) {
      dispatch(enqueueNotification({
        msg: "Removed idea from bookmarks.",
        type: "success",
        duration: 3000
      }))
    }

    return res


  } catch (err) {
    console.log(err)
  }

}

