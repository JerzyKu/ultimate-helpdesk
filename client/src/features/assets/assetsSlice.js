import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  assets: [],
  status: 'idle', // 'idle' | 'loading' | 'succeded' | 'failed'
  error: null
}

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async () => {
  const response = await axios.get(`/assets`)
  return response.data
})

export const addNewAsset = createAsyncThunk('assets/addNewAsset', async (initialAsset) => {
  const response = await axios.post('/assets', initialAsset)
  return response.data
})

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    assetAdded: {
      reducer(state, action) {
        state.assets.push(action.payload)
      },
      prepare(name, invSymbol, ownerID) {
        return {
          payload: {
            name,
            invSymbol,
            ownerID,
          },
        }
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.assets = action.payload
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewAsset.fulfilled, (state, action) => {
        state.assets.push(action.payload)
      })
      .addCase(addNewAsset.rejected, (state, action) => {
        console.log(action.error.message)
      })
  }
})

export const selectAllAssets = (state) => state.assets.assets
export const getAssetsStatus = (state) => state.assets.status
export const getAssetsError = (state) => state.assets.error

export const selectAssetByID = (state, assetID) => {
  console.log(state);
  return state.assets.assets.find(asset => asset._id === assetID)
}

export const { assetAdded } = assetsSlice.actions

export default assetsSlice.reducer