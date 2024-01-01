import { createSlice } from "@reduxjs/toolkit";

const initialDarkModeState = {
  darkModeStatus: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: initialDarkModeState,
  reducers: {
    updateDarkModeStatus(state, action) {
      state.darkModeStatus = action.payload.isDarkMode;
    },
  },
});

export const { updateDarkModeStatus } = darkModeSlice.actions;

export default darkModeSlice.reducer;

export function getDarkModeStatus(state) {
  return state.darkMode.darkModeStatus;
}
