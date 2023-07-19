import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  assets: [],
  status: 'idle', // idle | loading \ succeded | failed
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`/assets`)
  return response.data
})

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    assetAdded: {
      reducer(state, action) {
        state.assets.push(action.payload);
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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.assets = action.payload 
        console.log(action.payload );
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message

      })
      // .addCase()
  }
});

export const selectAllAssets = (state) => state.assets.assets;
export const getAssetsStatus = (state) => state.assets.status;
export const getAssetsError = (state) => state.assets.error;

export const { assetAdded } = assetsSlice.actions; 

export default assetsSlice.reducer;

