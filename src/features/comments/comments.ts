import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ActionTypes, StateTypes } from './comments.types';
import { AppDispatch, RootState } from '../../store';
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
    ReceivedData(state, action: ActionTypes) {
      state.isLoading = false;
      if (action.error)
        state.error = `${action.payload.message} (${action.payload.status})`;
      else state.comments = action.payload;
      console.log(state.comments);
    },
    startFetching(state) {
      return { ...state, isLoading: true, error: '' };
    },

    addComment(state, action) {
      return { ...state, comments: [...state.comments, action.payload] };
    },

    deleteComment(state, action) {
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.payload),
      };
    },

    upVote(state, action) {
      const isReply = action.payload.isReply;
      state.comments.map(comment => {
        if (!isReply)
          return comment.id === action.payload.id
            ? (comment.score =
                comment.score === comment.defaultScore + 1
                  ? comment.defaultScore
                  : comment.defaultScore + 1)
            : comment;
        return comment.replies.map((reply: any) =>
          reply.id === action.payload.id
            ? (reply.score =
                reply.score === reply.defaultScore + 1
                  ? reply.defaultScore
                  : reply.defaultScore + 1)
            : reply
        );
      });
    },

    downVote(state, action) {
      const isReply = action.payload.isReply;
      state.comments.map(comment => {
        if (!isReply)
          return comment.id === action.payload.id
            ? (comment.score =
                comment.score === comment.defaultScore - 1
                  ? comment.defaultScore
                  : comment.defaultScore - 1)
            : comment;
        return comment.replies.map((reply: any) =>
          reply.id === action.payload.id
            ? (reply.score =
                reply.score === reply.defaultScore - 1
                  ? reply.defaultScore
                  : reply.defaultScore - 1)
            : reply
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
        type: 'comments/ReceivedData',
        payload: res.data,
        error: false,
      });
    } catch (e) {
      dispatch({ type: 'comments/ReceivedData', payload: e, error: true });
    }
  };
}

export function addComment(content: string) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const newComment = {
      id: Math.floor(Math.random() * 10_000_000),
      content,
      createdAt: 'now',
      score: 0,
      defaultScore: 0,
      replies: [],
      currentUser: true,
      user: getState().currentUser.user,
    };
    dispatch({ type: 'comments/addComment', payload: newComment });
  };
}

export default commentsSlice.reducer;
export const { upVote, downVote, deleteComment } = commentsSlice.actions;
