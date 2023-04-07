/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface dataIn {
  data: {
    user_type: 'PET-OWNER' | 'PET-PROVIDER';
  } | null;
}
const initialState: dataIn = {
  data: null,
};

export const UserSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export const userActions = UserSlice.actions;

export default UserSlice.reducer;
