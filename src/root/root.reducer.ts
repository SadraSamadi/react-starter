import {combineReducers} from '@reduxjs/toolkit';
import {appReducer} from '../app/app.reducer';
import {RootState} from './root.model';

export const rootReducer = combineReducers<RootState>({
  app: appReducer
});
