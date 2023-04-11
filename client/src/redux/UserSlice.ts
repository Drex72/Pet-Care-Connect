/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../interfaces/User";

interface IUser {
  data: any
}
const initialState: IUser = {
  data: null,
};

export const UserSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (
      state,
      { payload }: { payload: { id: string; user_type: UserType } }
    ) => {
      state.data = { id: payload.id, user_type: payload.user_type };
    },
    logout: (state) => {
      state.data = null;
    },
    setProfile: (state, { payload }: { payload: any }) => {
      state.data = { ...state.data, ...payload };
    },
  },
});

export const userActions = UserSlice.actions;

export default UserSlice.reducer;
