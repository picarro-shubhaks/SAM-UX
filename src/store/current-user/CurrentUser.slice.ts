import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CALL_STATUS } from '../models/CallStatus';
import { CurrentUser } from '../models/User.model';

export type CurrentUserState = {
  currentUser: CurrentUser | null;
  loadCallStatus: CALL_STATUS;
  accessToken: string | null;
};

export type TokenPayload = {
  accessToken: string | null;
};

const initialState: CurrentUserState = {
  currentUser: null,
  loadCallStatus: CALL_STATUS.IDLE,
  accessToken: null,
};

function getInitialState() {
  return initialState;
}

const CurrentUserSlice = createSlice({
  name: 'current-user',
  initialState: getInitialState(),
  reducers: {
    resetState(state: CurrentUserState) {
      //should not directly change the state object
      //but each key of the state object should be modified.separetly
      Object.assign(state, getInitialState());
    },
    setCurrentUser: (state: CurrentUserState, action: PayloadAction<CurrentUser | null>) => {
      state.currentUser = action.payload;
    },
    setCurrentUserToken: (state: CurrentUserState, action: PayloadAction<TokenPayload>) => {
      state.accessToken = action.payload.accessToken;
    },

    setRemoteCallStatus: (state: CurrentUserState, action: PayloadAction<CALL_STATUS>) => {
      state.loadCallStatus = action.payload;
    },
  },
});

export const CurrentUserActions = CurrentUserSlice.actions;
export const CurrentUserReducer = CurrentUserSlice.reducer;
