import {SagaIterator} from 'redux-saga';
import {fork} from 'redux-saga/effects';
import {appSaga} from '../app/app.saga';

export function* rootSaga(): SagaIterator {
  yield fork(appSaga);
}
