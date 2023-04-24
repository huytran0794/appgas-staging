/* import packages */
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slice/userSlice";

const store = configureStore({
  reducer: {
    userReducer,
  },
  devTools: true,
});

export default store;
