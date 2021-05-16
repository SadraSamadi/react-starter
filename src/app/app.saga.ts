import {PayloadAction} from '@reduxjs/toolkit';
import {message} from 'antd';
import {SagaIterator} from 'redux-saga';
import {call, put, takeEvery, takeLeading} from 'redux-saga/effects';
import {appError, appInitFailure, appInitRequest, appInitSuccess} from './app.action';
import {init} from './app.api';

export function* appSaga(): SagaIterator {
  yield takeLeading(appInitRequest, handleInitRequest);
  yield takeEvery(appError, handleError);
}

function* handleInitRequest(): SagaIterator {
  try {
    yield call(init);
    yield put(appInitSuccess());
  } catch (err) {
    yield put(appInitFailure(err.message));
    yield put(appError(err.message));
  }
}

function* handleError(action: PayloadAction<string>): SagaIterator {
  yield call([message, message.error], action.payload);
}
