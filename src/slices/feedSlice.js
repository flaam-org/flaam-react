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
    },

    setBookmarkedState: (state, action) => {

      state.value = state.value.map(idea => {
        if (idea.id === action.payload.ideaId) {
          return { ...idea, bookmarked: action.payload.value }
        }

        return idea
      })

    }

  }
})

export const { setLoading, addToFeed, setBookmarkedState } = feedSlice.actions

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

export const addIdeaToBookmarksAsync = (ideaId) => async dispatch => {

  try {
    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(endpoints.ADD_IDEA_TO_BOOKMARKS(ideaId), {}, true)

    if (res.ok) {

      dispatch(setBookmarkedState({ ideaId, value: true }))
      dispatch(enqueueNotification({
        msg: `Added Idea to BookMarks`,
        type: "success",
        duration: 2000
      }))

    }

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
      dispatch(setBookmarkedState({ ideaId, value: false }))
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

export const selectFeed = state => state.feed.value
export const selectLoading = state => state.feed.loading

export default feedSlice.reducer