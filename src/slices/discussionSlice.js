import createSlice from '@reduxjs/toolkit';
import { endpoints } from '../utils/endpoints';
import { fetchWrapper } from '../utils/fetchWrapper';
import { manageLoginAsync } from './authSlice';
import { enqueueNotification } from './globalNotificationSlice';

const initialState = {
  loading: false,
  currentDiscussion: {}
}

const discussionSlice = createSlice({
  name: 'discussion',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentDiscussion: (state, action) => {
      state.currentDiscussion = action.payload;
    },
    setCurrentDiscussionVote: (state, action) => {
      state.currentDiscussion.vote = action.payload;
    },
    addToUpVoteCount: (state, action) => {
      state.currentDiscussion.upvote_count += action.payload;
    },
    addToDownVoteCount: (state, action) => {
      state.currentDiscussion.downvote_count += action.payload;
    },
    logoutReset: (state, action) => {
      state.currentDiscussion = {};
    }
  }
})


export const { setLoading, setCurrentDiscussion, setCurrentDiscussionVote, addToUpVoteCount, addToDownVoteCount, logoutReset } = discussionSlice.actions;

export const getSingleDiscussionAsync = (discussionId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(endpoints.SINGLE_DISCUSSION(discussionId), true)

    if (res.ok) {
      const resData = await res.json();

      dispatch(setCurrentDiscussion(resData));
    }


  } catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Failed to fetch Discussion details",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false));
  }

}


export const postDiscussionAsync = (discussion) => async (dispatch) => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(endpoints.GET_POST_DISCUSSIONS, discussion, true)

    if (res.ok) {
      // const resData = await res.json();

      dispatch(enqueueNotification({
        msg: "Discussion posted successfully",
        type: "success",
        duration: 3000
      }))
    }

  } catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Failed to post Discussion",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false));
  }
}

export const updateDiscussionAsync = (discussionId, discussion) => async (dispatch) => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.patch(endpoints.SINGLE_DISCUSSION(discussionId), discussion, true)

    if (res.ok) {
      // const resData = await res.json();

      dispatch(enqueueNotification({
        msg: "Discussion updated successfully",
        type: "success",
        duration: 3000
      }))
    }

  } catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Failed to update Discussion",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false));
  }
}


export const deleteDiscussionAsync = (discussionId) => async (dispatch) => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper._delete(endpoints.SINGLE_DISCUSSION(discussionId), true)

    if (res.ok) {
      // const resData = await res.json();

      dispatch(enqueueNotification({
        msg: "Discussion deleted successfully",
        type: "success",
        duration: 3000
      }))
    }

    return res

  } catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Failed to delete Discussion",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false));
  }
}

export const setDiscussionVoteAsync = (discussionId, vote, upDiff, downDiff) => async (dispatch) => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(`${endpoints.SET_DISCUSSION_VOTE(discussionId)}?value=${vote}`, true)

    if (res.ok) {

      dispatch(setCurrentDiscussionVote(vote));
      dispatch(addToUpVoteCount(upDiff));
      dispatch(addToDownVoteCount(downDiff));

    }

  }
  catch (err) {
    console.log(err);
    dispatch(enqueueNotification({
      msg: "Failed to vote",
      type: "error",
      duration: 2000
    }))
  }
  finally {
    dispatch(setLoading(false));
  }
}


export default discussionSlice.reducer;