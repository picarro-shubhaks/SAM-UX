import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CALL_STATUS } from "../types/CallStatus";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  applicableActions: string[];
};

export type UserState = {
  users: User[] | null;
  loadCallStatus: CALL_STATUS;
};

const initialState: UserState = {
  users: [
    {
      email: "shubhaks@picarro.com",
      firstName: "shubha",
      lastName: "kora sureshbabu",
      applicableActions: ["Add", "Update", "Delete"],
    },
    {
      email: "vedant@picarro.com",
      firstName: "vedant",
      lastName: "mittal",
      applicableActions: ["Add", "Update", "Delete"],
    },
  ],
  loadCallStatus: CALL_STATUS.IDLE,
};

function getInitialState() {
  return initialState;
}

const UserSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    resetState(state: UserState) {
      //should not directly change the state object
      //but each key of the state object should be modified.separetly
      Object.assign(state, getInitialState());
    },
    setUser: (state: UserState, action: PayloadAction<User[] | null>) => {
      state.users = action.payload;
    },
    setRemoteCallStatus: (
      state: UserState,
      action: PayloadAction<CALL_STATUS>
    ) => {
      state.loadCallStatus = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
