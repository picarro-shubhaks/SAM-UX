import { all } from 'redux-saga/effects';
import { watchGetCurrentUser } from './current-user/CurrentUser.saga';
import { watchGetListOfUsers } from './manage-users/ListUsers.saga';

export function* WatcherSaga() {
  yield all([watchGetCurrentUser(), watchGetListOfUsers()]);
}
