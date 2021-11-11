import { createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../utils/fetchWrapper';
import { manageLoginAsync } from './authSlice';
import { endpoints } from "../utils/endpoints";
import { enqueueNotification } from './globalNotificationSlice';


const initialState = {
    loading: false,
    totalCount: 0,
    value: [],
}

const discussionSlice = createSlice({
    name: 'ideaDiscussions',
    initialState,
    reducers: {
        setIdeaDiscussions: (state, action) => {
            state.value = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        addToIdeaDiscussions: (state, action) => {
            state.value = [...state.value, ...action.payload]
        },
        addNewDiscussion: (state, action) => {
            state.value = [action.payload, ...state.value]
        },
        logoutResetIdeaDiscussions: (state, action) => {
            state.loading = false;
            state.totalCount = 0;
            state.value = [];
        }
    }
})

export const { setLoading, setIdeaDiscussions, addToIdeaDiscussions, addNewDiscussion, setTotalCount, logoutResetIdeaDiscussions } = discussionSlice.actions;


export const getIdeaDiscussions = (ideaId) => async (dispatch, getState) => {

    const queryParams = [];
    queryParams.push(`idea=${ideaId}`);
    queryParams.push(`offset=${0}`)
    queryParams.push(`ordering=-created_at`)
    queryParams.push(`limit=${10}`)

    dispatch(setLoading(true));

    try {

        await dispatch(manageLoginAsync())
        const res = await fetchWrapper.get(`${endpoints.GET_POST_DISCUSSIONS}?${queryParams.join("&")}`, true)

        if (res.ok) {
            const resData = await res.json();

            dispatch(setIdeaDiscussions(resData.results));
            dispatch(setTotalCount(resData.count));
        }


    } catch (err) {
        console.log(err);
        dispatch(enqueueNotification({
            msg: "Failed To fetch Discussions. Retry",
            type: "error",
            duration: 3000
        }))
    }
    finally {
        dispatch(setLoading(false));
    }
}

export const getNextIdeaDiscussions = (ideaId) => async (dispatch, getState) => {

    const { value, totalCount } = getState().ideaDiscussions;

    if (value.length === totalCount) return;

    const queryParams = [];
    queryParams.push(`idea=${ideaId}`);
    queryParams.push(`offset=${value.length}`)
    queryParams.push(`ordering=-created_at`)
    queryParams.push(`limit=${10}`)

    dispatch(setLoading(true));

    try {

        await dispatch(manageLoginAsync())
        const res = await fetchWrapper.get(`${endpoints.GET_POST_DISCUSSIONS}?${queryParams.join("&")}`, true)

        if (res.ok) {
            const resData = await res.json();

            dispatch(addToIdeaDiscussions(resData.results));
        }

    }
    catch (err) {
        console.log(err);
        dispatch(enqueueNotification({
            msg: "Failed To fetch Discussions. Retry",
            type: "error",
            duration: 3000
        }))
    }
    finally {
        dispatch(setLoading(false));
    }
}

export const postDiscussionAsync = (data) => async (dispatch, getState) => {
    try {
        await dispatch(manageLoginAsync())
        const res = await fetchWrapper.post(endpoints.GET_POST_DISCUSSIONS, data, true)

        const resData = await res.json()

        if (res.ok) {

            dispatch(addNewDiscussion(resData))

            dispatch(enqueueNotification({
                msg: "A new discussion created successfully",
                type: "success",
                duration: 3000
            }))
        }

        return { status: res.status, data: resData }

    }
    catch (err) {
        console.log(err);
        dispatch(enqueueNotification({
            msg: "Failed to created discussion",
            type: "error",
            duration: 3000
        }))
    }
}


export const selectIdeaDiscussions = (state) => state.ideaDiscussions.value;
export const selectLoading = (state) => state.ideaDiscussions.loading;

export default discussionSlice.reducer;
