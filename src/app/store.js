import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'
import notificationReducer from '../slices/globalNotificationSlice'
import ideaReducer from "../slices/ideaSlice"
import myIdeasReducer from "../slices/myIdeasSlice"
import feedReducer from "../slices/feedSlice"
import bookmarkedIdeasReducer from "../slices/bookmarkedIdeasSlice"

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    user: userReducer,
    idea: ideaReducer,
    myIdeas: myIdeasReducer,
    bookmarkedIdeas: bookmarkedIdeasReducer,
    feed: feedReducer
  },
});
