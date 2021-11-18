import { ExecuteApi, ExecuteApiError, ExecuteApiResponse } from '../execute-api/ExecuteApi.saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosRequestConfig } from 'axios';
import { CurrentUserActions } from '../../store/current-user/CurrentUser.slice';
import { BASE_URL } from '../../constants';
import { GET_CURRENT_USER } from './CurrentUser.action';
import { executeApiRetry } from '../execute-api/ExecuteApi.action';
import { CALL_STATUS } from '../../store/models/CallStatus';
import { API_SERVER_STATUS } from '../../store/api-server-status/ApiServerStatus.slice';
import { ApiServerActions } from '../../store/api-server-status/ApiServerStatus.slice';
import Cookies from 'js-cookie';
import { CurrentUser } from '../../store/models/User.model';

export type Contract = {
  message: string;
};

export function PrepareAxiosRequestConfigForCurrentUser(): AxiosRequestConfig {
  return {
    baseURL: BASE_URL,
    url: '/profile/current-user',
    method: 'GET',
  };
}

export function PrepareAxiosRequestConfigForRefreshToken(): AxiosRequestConfig {
  return {
    baseURL: BASE_URL,
    url: '/auth/refresh-token',
    method: 'GET',
  };
}

export function PrepareCurrentUserFromReply(executeApiReply: ExecuteApiResponse<Contract>): CurrentUser {
  const response: any = executeApiReply.response;
  const { result } = response.data;

  return {
    email: result.email,
    emailVerified: result.emailVerified,
    firstName: result.firstName,
    lastName: result.lastName,
    username: result.username,
    id: result.id,
    roles: result.roles,
    fullName: result.fullName,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* workerGetCurrentUser() {
  // Set call in progress
  yield put(CurrentUserActions.setRemoteCallStatus(CALL_STATUS.IN_PROGRESS));

  //get accessToken and refreshToken from the
  const accessToken = Cookies.get('access_token') || null;

  yield put(CurrentUserActions.setCurrentUserToken({ accessToken: accessToken }));

  // Make the call
  let executeApiReply: ExecuteApiResponse<Contract> | ExecuteApiError = yield call(
    ExecuteApi,
    PrepareAxiosRequestConfigForCurrentUser(),
    false,
  );

  if (executeApiReply.ok) {
    // The ExecuteApi saga will only set error STATUS.
    // Only this API shall set STATUS to OK.
    yield put(ApiServerActions.setApiServerStatus(API_SERVER_STATUS.OK));

    yield put(CurrentUserActions.setCurrentUser(PrepareCurrentUserFromReply(executeApiReply)));

    // Set user and made call status idle
    yield put(CurrentUserActions.setRemoteCallStatus(CALL_STATUS.IDLE));

    // Retry stalled APIs
    yield put(executeApiRetry());
    return;
  }
  // current user api failed so making call to refresh_token api
  executeApiReply = yield call(ExecuteApi, PrepareAxiosRequestConfigForRefreshToken(), false);

  if (executeApiReply.ok) {
    const accessToken = Cookies.get('access_token') || null;

    yield put(CurrentUserActions.setCurrentUserToken({ accessToken: accessToken }));

    // The ExecuteApi saga will only set error STATUS.
    // Only this API shall set STATUS to OK.
    yield put(ApiServerActions.setApiServerStatus(API_SERVER_STATUS.OK));

    // Set user and made call status idle
    yield put(CurrentUserActions.setRemoteCallStatus(CALL_STATUS.IDLE));

    // Retry stalled APIs
    yield put(executeApiRetry());
  }

  // Set user to null and made call status as failed
  yield put(CurrentUserActions.setRemoteCallStatus(CALL_STATUS.FAILED));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watchGetCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, workerGetCurrentUser);
}
