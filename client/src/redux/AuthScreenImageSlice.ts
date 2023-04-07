/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface IAuthScreenImage {
  image: string | null;
}
const initialState: IAuthScreenImage = {
  image: null,
};

export const authScreenImage = createSlice({
  name: "authScreenImage",
  initialState,
  reducers: {
    addImage: (state, { payload }: { payload: string }) => {
      state.image = payload;
    },
  },
});

export const authScreenActions = authScreenImage.actions;

export default authScreenImage.reducer;
