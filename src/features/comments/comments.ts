import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ActionTypes, StateTypes } from './comments.types';
import { AppDispatch } from '../../store';
import { API_URL } from '../../config/config';

const initialState: StateTypes = {
  isLoading: false,
  error: '',
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    ReceivedComments(state, action: ActionTypes) {
      state.isLoading = false;
      if (action.error)
        state.error = `${action.payload.message} (${action.payload.status})`;
      else state.comments = action.payload;
    },
    startFetching(state) {
      return { ...state, isLoading: true, error: '' };
    },

    upVote(state, action) {
      const isReply = action.payload.isReply;
      state.comments.map(comment => {
        if (!isReply)
          return comment.id === action.payload.id ? comment.score++ : comment;
        return comment.replies.map((reply: any) =>
          reply.id === action.payload.id ? reply.score++ : reply
        );
      });
    },

    downVote(state, action) {
      const isReply = action.payload.isReply;
      state.comments.map(comment => {
        if (!isReply)
          return comment.id === action.payload.id ? comment.score-- : comment;
        return comment.replies.map((reply: any) =>
          reply.id === action.payload.id ? reply.score-- : reply
        );
      });
    },
  },
});

export function fetchComments() {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch({ type: 'comments/startFetching' });
      const res: AxiosResponse = await axios.get(API_URL + '/comments');
      if (!res.data)
        throw new Error('Something went wrong during fetching comments');
      dispatch({
        type: 'comments/ReceivedComments',
        payload: res.data,
        error: false,
      });
    } catch (e) {
      dispatch({ type: 'comments/ReceivedComments', payload: e, error: true });
    }
  };
}

export default commentsSlice.reducer;
export const { upVote, downVote } = commentsSlice.actions;
