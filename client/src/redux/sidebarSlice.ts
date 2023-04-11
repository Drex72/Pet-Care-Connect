/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "Sidebar",
  initialState: {
    sidebarOpened: false,
    isMobile: false,
  },
  reducers: {
    toggleSideBar: (state, { payload }: { payload: boolean }) => {
      state.sidebarOpened = payload;
    },
    toggleMobileState: (state, { payload }: { payload: boolean }) => {
      state.isMobile = payload;
    },
  },
});

export const { toggleSideBar, toggleMobileState } = sidebarSlice.actions;

export default sidebarSlice.reducer;
