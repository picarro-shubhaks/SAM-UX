import { ExecuteApi, ExecuteApiError, ExecuteApiResponse } from '../execute-api/ExecuteApi.saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../../constants';
import { CALL_STATUS } from '../../store/models/CallStatus';
import { UserActions } from '../../store/manage-users/User.slice';
import { GET_LIST_OF_USERS } from './ListUsers.action';
import { User } from '../../store/models/User.model';

export type Contract = {
  message: string;
};

export function PrepareAxiosRequestConfig(): AxiosRequestConfig {
  return {
    baseURL: BASE_URL,
    url: '/admin/users',
    method: 'GET',
  };
}

export function PrepareListOfUsersFromReply(executeApiReply: ExecuteApiResponse<Contract>): User[] {
  const response: any = executeApiReply.response;
  const { result } = response.data;

  return result;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* workerGetListOfUsers() {
  // Set call in progress
  yield put(UserActions.setRemoteCallStatus(CALL_STATUS.IN_PROGRESS));

  // Make the call
  const executeApiReply: ExecuteApiResponse<Contract> | ExecuteApiError = yield call(
    ExecuteApi,
    PrepareAxiosRequestConfig(),
  );

  if (executeApiReply.ok) {
    // The ExecuteApi saga will only set error STATUS.
    // Only this API shall set STATUS to OK.
    yield put(UserActions.setUsers(PrepareListOfUsersFromReply(executeApiReply)));

    // Set user and made call status SUCCESS
    yield put(UserActions.setRemoteCallStatus(CALL_STATUS.SUCCESS));
  } else {
    // Set user to null and made call status as failed
    yield put(UserActions.setRemoteCallStatus(CALL_STATUS.FAILED));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watchGetListOfUsers() {
  yield takeLatest(GET_LIST_OF_USERS, workerGetListOfUsers);
}
