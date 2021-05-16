import {createReducer} from '@reduxjs/toolkit';
import {appInitFailure, appInitRequest, appInitSuccess} from './app.action';
import {AppState} from './app.model';

const initialState: AppState = {
  init: null
};

export const appReducer = createReducer(initialState, {
  [appInitRequest.type]: state => {
    state.init = 'request';
  },
  [appInitSuccess.type]: state => {
    state.init = 'success';
  },
  [appInitFailure.type]: state => {
    state.init = 'failure';
  }
});
