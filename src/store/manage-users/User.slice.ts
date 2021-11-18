import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CALL_STATUS } from '../models/CallStatus';
import { User } from '../models/User.model';

export type UserState = {
  users: User[] | null;
  loadCallStatus: CALL_STATUS;
  isInitialized: boolean;
};

const initialState: UserState = {
  users: [],
  loadCallStatus: CALL_STATUS.IDLE,
  isInitialized: false,
};

function getInitialState() {
  return initialState;
}

const UserSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    resetState(state: UserState) {
      //should not directly change the state object
      //but each key of the state object should be modified.separetly
      Object.assign(state, getInitialState());
    },
    setUsers: (state: UserState, action: PayloadAction<User[] | null>) => {
      state.users = action.payload;
    },
    setRemoteCallStatus: (state: UserState, action: PayloadAction<CALL_STATUS>) => {
      state.loadCallStatus = action.payload;
      if (state.loadCallStatus === 'SUCCESS') {
        state.isInitialized = true;
        state.loadCallStatus = CALL_STATUS.IDLE;
      }
    },
  },
});

export const UserActions = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
