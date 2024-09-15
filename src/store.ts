import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './features/comments/comments.ts';
import CurrentUserReducer from './features/CurrentUser/currentUser.ts';

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    currentUser: CurrentUserReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
