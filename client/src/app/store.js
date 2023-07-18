import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../features/assets/assetsSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    users: usersSlice
  },
});
