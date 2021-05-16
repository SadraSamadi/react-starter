import {
  CaseReducer,
  configureStore,
  EnhancedStore,
  ParametricSelector,
  PayloadAction,
  Selector
} from '@reduxjs/toolkit';
import _ from 'lodash';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {AsyncState, Failure, FailureAction, RootState} from './root.model';
import {rootReducer} from './root.reducer';
import {rootSaga} from './root.saga';

export function createStore(): EnhancedStore<RootState> {
  let sagaMiddleware = createSagaMiddleware();
  let store = configureStore({
    reducer: rootReducer,
    middleware: _.filter([
      sagaMiddleware,
      process.env.NODE_ENV === 'development' && logger
    ])
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

export function error<P = void>(): (err: Error, payload: P) => { payload: P; error: Failure; } {
  return (err, payload) => ({payload, error: err.message});
}

export function request<S, T>(path?: string): CaseReducer<S> {
  return draft => {
    let state: AsyncState<T> = path ? _.get(draft, path) : draft;
    state.status = 'request';
    state.error = null;
  };
}

export function cancel<S, T>(path?: string): CaseReducer<S> {
  return draft => {
    let state: AsyncState<T> = path ? _.get(draft, path) : draft;
    state.status = 'cancel';
  };
}

export function success<S, T>(path?: string): CaseReducer<S, PayloadAction<T>> {
  return (draft, action) => {
    let state: AsyncState<T> = path ? _.get(draft, path) : draft;
    state.status = 'success';
    state.data = action.payload;
  };
}

export function failure<S, T, P>(path?: string): CaseReducer<S, FailureAction<P>> {
  return (draft, action) => {
    let state: AsyncState<T> = path ? _.get(draft, path) : draft;
    state.status = 'failure';
    state.error = action.error;
  };
}

export function selector<R, P = void, S = RootState>(select: ParametricSelector<S, P, R>): (props: P, ...args: any[]) => Selector<S, R> {
  return (props, ...args) => state => select(state, props, ...args);
}
