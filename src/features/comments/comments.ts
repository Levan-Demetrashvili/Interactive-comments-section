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
    fetchComments(state, action: ActionTypes) {
      state.isLoading = false;
      if (action.error)
        state.error = `${action.payload.message} (${action.payload.status})`;
      else state.comments = action.payload;
    },
    startFetching(state) {
      return { ...state, isLoading: true, error: '' };
    },
  },
});

export function fetchComments() {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch({ type: 'comments/startFetching' });
      const res: AxiosResponse = await axios.get(API_URL + '/comments');
      if (!res.data) throw new Error('Something went wrong during fetching');
      dispatch({
        type: 'comments/fetchComments',
        payload: res.data,
        error: false,
      });
    } catch (e) {
      dispatch({ type: 'comments/fetchComments', payload: e, error: true });
    }
  };
}

export default commentsSlice.reducer;
