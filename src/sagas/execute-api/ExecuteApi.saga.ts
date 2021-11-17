import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { take, call, put, select, actionChannel } from 'redux-saga/effects';
import axios from 'axios';
import { API_SERVER_STATUS } from '../../store/api-server-status/ApiServerStatus.slice';

import { ExecuteApiRetryAction, EXECUTE_API_RETRY } from './ExecuteApi.action';
import { ApiServerActions } from '../../store/api-server-status/ApiServerStatus.slice';
import { Channel } from '@redux-saga/types';
import { RootState } from '../../store/RootReducer';

export type ExecuteApiResponse<T> = {
  ok: true;
  response: AxiosResponse<T>;
};

export type ExecuteApiError = {
  ok: false;
  error: AxiosError;
};

export function LookupApiServerStatus(status: number): API_SERVER_STATUS | null {
  switch (status) {
    case 401:
      return API_SERVER_STATUS.USER_LOGIN_REQUIRED;
    case 403:
      return API_SERVER_STATUS.USER_NOT_AUTHORISED;
    case 0:
      return API_SERVER_STATUS.NETWORK_ERROR;
    case 502:
    case 503:
      return API_SERVER_STATUS.SERVER_UNAVAILABLE;
    default:
      // All other 4xx and 5xx should reach the caller and caller should handle these
      return null;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* ExecuteApi<T>(config: AxiosRequestConfig, shouldRetry = true) {
  const retryChannel: Channel<ExecuteApiRetryAction> = (yield actionChannel(
    EXECUTE_API_RETRY,
  )) as Channel<ExecuteApiRetryAction>;
  while (true) {
    let reply: ExecuteApiResponse<T> | ExecuteApiError;
    const accessToken: string | null = yield select((state: RootState) => state.currentUser.accessToken);
    const finalAxiosConfig = {
      ...config,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };
    try {
      const response: AxiosResponse<T> = yield call(axios.request, finalAxiosConfig);
      reply = { ok: true, response: response };
      return reply;
    } catch (error: any) {
      reply = { ok: false, error: error };

      const status = error.response.status;
      const apiServerStatus = LookupApiServerStatus(status);

      if (apiServerStatus) {
        yield put(ApiServerActions.setApiServerStatus(apiServerStatus));

        if (shouldRetry) {
          // Now stall until there is retry action dispatched
          yield take(retryChannel);

          // Now go back to make a request to retry
          continue;
        }
      }
      return reply;
    }
  }
}
