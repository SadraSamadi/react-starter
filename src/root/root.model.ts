import {PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '../app/app.model';

export interface RootState {

  app: AppState;

}

export type Failure = string;

export type FailureAction<P = void> = PayloadAction<P, string, never, Failure>;

export type AsyncStatus = 'request' | 'cancel' | 'success' | 'failure';

export interface AsyncState<T, S = AsyncStatus, E = Failure> {

  status: S;

  data: T;

  error: E;

}
