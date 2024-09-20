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
    },
    startFetching(state) {
      return { ...state, isLoading: true, error: '' };
    },

    addComment(state, action) {
      return { ...state, comments: [...state.comments, action.payload] };
    },

    addReply(state, action: ActionTypes) {
      state.comments.forEach(comment => {
        if (comment.id === action.meta) {
          comment.replies.push(action.payload);
          return;
        }
        comment.replies.forEach((reply: Record<string, any>) => {
          if (reply.id === action.meta) {
            comment.replies.push(action.payload);
            return;
          }
        });
      });
    },

    deleteComment(state, action) {
      state.comments = state.comments.filter(c => c.id !== action.payload);
      state.comments = state.comments.map(comment => {
        return {
          ...comment,
          replies: comment.replies.filter(
            (reply: Record<string, any>) => reply.id !== action.payload
          ),
        };
      });
    },

    editComment(state, action) {
      if (action.payload.text) {
        state.comments = state.comments.map(c =>
          c.id === action.payload.id ? { ...c, content: action.payload.text } : c
        );
      } else {
        state.comments = state.comments.filter(c => c.id !== action.payload.id);
      }
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
      if (!res.data) throw new Error('Something went wrong during fetching comments');
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

export function addComment(content: string, id?: number, to?: string) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const newComment = {
      id: Math.floor(Math.random() * 10_000_000),
      content,
      createdAt: 'now',
      score: 0,
      defaultScore: 0,
      ...(!to ? { replies: [] } : { replyingTo: to }),
      currentUser: true,
      user: getState().currentUser.user,
    };
    dispatch({
      type: to ? 'comments/addReply' : 'comments/addComment',
      payload: newComment,
      meta: id,
    });
  };
}

export default commentsSlice.reducer;
export const { upVote, downVote, deleteComment, editComment } = commentsSlice.actions;
