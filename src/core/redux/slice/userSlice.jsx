import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_SERVICE } from "../../services/localServ";

const initialState = {
  userInfo: LOCAL_SERVICE.user.get() || {},
  taskNoti: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userInfo = { ...action.payload };
    },
    cancelTask: (state) => {
      state.taskNoti = "cancel";
    },
    assignTask: (state) => {
      state.taskNoti = "assign";
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
