import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'
import notificationReducer from '../slices/globalNotificationSlice'
import ideaReducer from "../slices/ideaSlice"
import myIdeasReducer from "../slices/myIdeasSlice"
import feedReducer from "../slices/feedSlice"
import bookmarkedIdeasReducer from "../slices/bookmarkedIdeasSlice"
import myImplementationsReducer from '../slices/myImplementationsSlice';
import ideaDiscussionsReducer from '../slices/ideaDiscussionsSlice';
import implementationReducer from '../slices/implementationSlice';
import ideaImplementationsReducer from "../slices/ideaImplementationsSlice"

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    user: userReducer,
    idea: ideaReducer,
    myIdeas: myIdeasReducer,
    bookmarkedIdeas: bookmarkedIdeasReducer,
    feed: feedReducer,
    myImplementations: myImplementationsReducer,
    ideaDiscussions: ideaDiscussionsReducer,
    implementation: implementationReducer,
    ideaImplementations: ideaImplementationsReducer
  },
});
