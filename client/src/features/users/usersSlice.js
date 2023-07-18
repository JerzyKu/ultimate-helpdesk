import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Szymon Bączyk" },
  { id: "1", name: "Krystynka Krochmal" },
  { id: "2", name: "Jakub Wilczek" },
];

const assetsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default assetsSlice.reducer;
