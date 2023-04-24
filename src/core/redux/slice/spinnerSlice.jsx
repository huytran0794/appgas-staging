import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState: initialState,
  reducers: {
    setLoadingOn: (state) => {
      state.isLoading = true;
    },
    setLoadingOff: (state) => {
      state.isLoading = false;
    },
  },
});

export const spinnerActions = spinnerSlice.actions;

const spinnerReducer = spinnerSlice.reducer;

export default spinnerReducer;
