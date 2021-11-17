import { ExecuteApi, ExecuteApiError, ExecuteApiResponse } from '../execute-api/ExecuteApi.saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosRequestConfig } from 'axios';
import { CurrentUserActions } from '../../store/current-user/CurrentUser.slice';
import { BASE_URL } from '../../constants';
import { GET_CURRENT_USER } from './CurrentUser.action';
import { executeApiRetry } from '../execute-api/ExecuteApi.action';
import { CALL_STATUS } from '../../store/types/CallStatus';
import { API_SERVER_STATUS } from '../../store/api-server-status/ApiServerStatus.slice';
import { ApiServerActions } from '../../store/api-server-status/ApiServerStatus.slice';
import Cookies from 'js-cookie';
import { User } from '../../store/user/User.slice';

export type Contract = {
  message: string;
};

export function PrepareAxiosRequestConfig(): AxiosRequestConfig {
  return {
    baseURL: BASE_URL,
    url: '/loggedIn',
    method: 'GET',
  };
}

export function PrepareUserFromReply(executeApiReply: ExecuteApiResponse<Contract>): User {
  const response: any = executeApiReply.response;
  return {
    email: response.email,
    firstName: response.firstName,
    lastName: response.lastName,
    applicableActions: response.applicableActions,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* workerGetCurrentUser() {
  // Set call in progress
  yield put(CurrentUserActions.setRemoteCallStatus(CALL_STATUS.IN_PROGRESS));
  console.log('shubha inprogress');
  //get accessToken and refreshToken from the
  const accessToken = Cookies.get('access_token') || null;
  const refreshToken = Cookies.get('refresh_token') || null;
  console.log('accessToken');
  yield put(CurrentUserActions.setCurrentUserToken({ accessToken: accessToken, refreshToken: refreshToken }));

  // Make the call
  const executeApiReply: ExecuteApiResponse<Contract> | ExecuteApiError = yield call(
    ExecuteApi,
    PrepareAxiosRequestConfig(),
    false,
  );

  if (executeApiReply.ok) {
    // The ExecuteApi saga will only set error HOGWARTS_STATUS.
    // Only this API shall set HOGWARTS_STATUS to OK.
    yield put(ApiServerActions.setApiServerStatus(API_SERVER_STATUS.OK));

    yield put(CurrentUserActions.setCurrentUser(PrepareUserFromReply(executeApiReply)));

    // Set user and made call status idle
    yield put(CurrentUserActions.setRemoteCallStatus(CALL_STATUS.IDLE));

    // Retry stalled APIs

    yield put(executeApiRetry());
  } else {
    // Set user to null and made call status as failed
    yield put(CurrentUserActions.setRemoteCallStatus(CALL_STATUS.FAILED));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watchGetCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, workerGetCurrentUser);
}
