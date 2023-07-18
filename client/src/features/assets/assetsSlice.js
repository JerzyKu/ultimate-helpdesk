import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
  status: 'idle', // idle | loading \ succeded | failed
  error: null
}


const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    assetAdded: {
      reducer(state, action) {
        // console.log("action: ", action);
        state.push(action.payload);
      },
      prepare(name, invSymbol, ownerID) {
        return {
          payload: {
            id: nanoid(),
            name,
            invSymbol,
            ownerID,
          },
        };
      },
    },
  },
});

export const selectAllAssets = (state) => state.assets.assets;

export const { assetAdded } = assetsSlice.actions;

export default assetsSlice.reducer;
