import { all } from 'redux-saga/effects';
import { watchGetCurrentUser } from './current-user/CurrentUser.saga';

export function* WatcherSaga() {
  yield all([watchGetCurrentUser()]);
}
