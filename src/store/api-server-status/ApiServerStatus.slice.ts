import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum API_SERVER_STATUS {
  OK = 'Logged in',
  NETWORK_ERROR = 'Network error',
  SERVER_UNAVAILABLE = 'Server unavailable',
  USER_LOGIN_REQUIRED = 'Login required',
  USER_NOT_WHITELISTED = 'User not whitelisted',
  USER_NOT_AUTHORISED = 'User not authorised',
}

export type apiServerState = {
  apiServerStatus: string;
};

const initialState: apiServerState = {
  apiServerStatus: API_SERVER_STATUS.OK,
};

function getInitialState() {
  return initialState;
}

const ApiServerSlice = createSlice({
  name: 'api-server',
  initialState: getInitialState(),
  reducers: {
    resetState(state: apiServerState) {
      //should not directly change the state object
      //but each key of the state object should be modified.separetly
      Object.assign(state, getInitialState());
    },
    setApiServerStatus(state: apiServerState, action: PayloadAction<API_SERVER_STATUS>) {
      state.apiServerStatus = action.payload;
    },
  },
});

export const ApiServerActions = ApiServerSlice.actions;
export const ApiServerReducer = ApiServerSlice.reducer;
