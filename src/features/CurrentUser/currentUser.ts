import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from '../../store';
import { ActionTypes, StateTypes } from './currentUser.types';
import { API_URL } from '../../config/config';

const initialState: StateTypes = {
  isLoading: false,
  error: '',
  user: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    ReceivedCurrentUser(state, action: ActionTypes) {
      state.isLoading = false;
      if (action.error)
        state.error = `${action.payload.message} (${action.payload.status})`;
      else state.user = action.payload;
    },
    startFetching(state) {
      return { ...state, isLoading: true, error: '' };
    },
  },
});

export function fetchCurrentUser() {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch({ type: 'currentUser/startFetching' });
      const res: AxiosResponse = await axios.get(API_URL + '/currentUser');
      if (!res.data)
        throw new Error('Something went wrong during fetching user');
      dispatch({
        type: 'currentUser/ReceivedCurrentUser',
        payload: res.data,
        error: false,
      });
    } catch (e) {
      dispatch({
        type: 'currentUser/ReceivedCurrentUser',
        payload: e,
        error: true,
      });
    }
  };
}

export default currentUserSlice.reducer;
