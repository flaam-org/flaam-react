import { createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../utils/fetchWrapper"
import { manageLoginAsync } from "./authSlice"
import { endpoints } from "../utils/endpoints"
import { enqueueNotification } from "./globalNotificationSlice"

const initialState = {
  loading: false,
  totalCount: 0,
  value: []
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setFeed: (state, action) => {
      state.value = action.payload
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },

    addToFeed: (state, action) => {

      // const existing = new Set(state.value.map(x => x.id))

      // const uniqueResults = action.payload.filter(r => {
      //   return !existing.has
      // })

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

export const { setLoading, addToFeed, setBookmarkedState, setTotalCount, setFeed } = feedSlice.actions


export const getFeedAsync = () => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`limit=${10}`)

  dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IDEAS}?${queryParams.join("&")}`, true)


    if (res.ok) {

      const resData = await res.json()

      dispatch(setFeed(resData?.results))
      dispatch(setTotalCount(resData?.count))

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



export const addToFeedAsync = () => async (dispatch, getState) => {

  const { value, totalCount } = getState().feed

  if (value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${getState().feed.value.length}`)
  queryParams.push(`ordering=-created_at`)
  queryParams.push(`limit=${10}`)

  await dispatch(setLoading(true))

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_IDEAS}?${queryParams.join("&")}`, true)


    if (res.ok) {

      const resData = await res.json()

      await dispatch(addToFeed(resData?.results))

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
    await dispatch(setLoading(false))
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