import {
  createAsyncThunk,
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../api/axios";

const assetsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
})

const initialState = assetsAdapter.getInitialState({
  status: "idle", // 'idle' | 'loading' | 'succeded' | 'failed'
  error: null,
})

export const fetchAssets = createAsyncThunk("assets/fetchAssets", async () => {
  const response = await axios.get(`/assets`);
  return response.data;
});

export const addNewAsset = createAsyncThunk(
  "assets/addNewAsset",
  async (initialAsset) => {
    const response = await axios.post("/assets", initialAsset);
    return response.data;
  }
);

export const updateAsset = createAsyncThunk(
  "asset/updateAsset",
  async (initialAsset) => {
    try {
      const response = await axios.put(`/assets/`, initialAsset);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteAsset = createAsyncThunk(
  "asset/deleteAsset",
  async (initialAsset) => {
    try {
      // console.log("delete thunk: ", initialAsset);
      const response = await axios.delete(`/assets/${initialAsset.id}`);
      if (response.status === 200) return initialAsset;
      return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        assetsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewAsset.fulfilled, (state, action) => {
        // state.assets.push(action.payload);
        assetsAdapter.addOne(state, action.payload)

      })
      .addCase(addNewAsset.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        // const { _id } = action.payload;
        // const assets = state.assets.filter((asset) => asset._id !== _id);
        assetsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        // const assets = state.assets.filter((asset) => asset._id !== id);
        assetsAdapter.removeOne(state, id )
      });
  },
});

export const {
  selectAll: selectAllAssets,
  selectById: selectAssetById,
  selectIds: selectAssetsIds
} = assetsAdapter.getSelectors(state => state.assets)

export const getAssetsStatus = (state) => state.assets.status;
export const getAssetsError = (state) => state.assets.error;

export const selectAssetsByOwner = createSelector(
  [selectAllAssets, (state, userId) => userId],
  (assets, userId) => assets.filter((asset) => asset.ownerID === userId)
);

// export const { assetAdded } = assetsSlice.actions;

export default assetsSlice.reducer;
