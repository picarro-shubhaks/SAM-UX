import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CALL_STATUS } from '../types/CallStatus';
import { User } from '../user/User.slice';

export type UserState = {
  currentUser: User | null;
  loadCallStatus: CALL_STATUS;
  accessToken: string | null;
  refreshToken: string | null;
};

export type TokenPayload = {
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: UserState = {
  currentUser: null,
  loadCallStatus: CALL_STATUS.IDLE,
  accessToken: null,
  refreshToken: null,
};

function getInitialState() {
  return initialState;
}

const CurrentUserSlice = createSlice({
  name: 'current-user',
  initialState: getInitialState(),
  reducers: {
    resetState(state: UserState) {
      //should not directly change the state object
      //but each key of the state object should be modified.separetly
      Object.assign(state, getInitialState());
    },
    setCurrentUser: (state: UserState, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setCurrentUserToken: (state: UserState, action: PayloadAction<TokenPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setRemoteCallStatus: (state: UserState, action: PayloadAction<CALL_STATUS>) => {
      state.loadCallStatus = action.payload;
    },
  },
});

export const CurrentUserActions = CurrentUserSlice.actions;
export const CurrentUserReducer = CurrentUserSlice.reducer;
