import { Action } from 'redux';

export const EXECUTE_API_RETRY = 'executeApi/retry';

export interface ExecuteApiRetryAction {
  type: 'executeApi/retry';
}

export function executeApiRetry(): Action<string> {
  return {
    type: EXECUTE_API_RETRY,
  };
}
