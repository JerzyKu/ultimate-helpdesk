import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const assetsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = assetsAdapter.getInitialState();

export const extendetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => "/assets",
      transformResponse: (responseData) =>
        assetsAdapter.setAll(initialState, responseData),

      providesTags: (result, error, arg) => [
        { type: "Asset", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Asset", id })),
      ],
    }),
    getAssetsByOwnerId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData) => {
        return assetsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        return [...result.ids.map((id) => ({ type: "Asset", id }))];
      },
    }),
    addNewAsset: builder.mutation({
      query: initailAsset => ({
        url: `/assets`,
        method: 'POST',
        body: initailAsset
      }), 
      invalidatesTags: [
        { type: 'Asset', id: 'LIST'}
      ]
    })
  }),
});

export const { useGetAssetsQuery, useGetAssetsByOwnerIdQuery } =
  extendetApiSlice;

//returns the query result object
export const selectAsstsResult = extendetApiSlice.endpoints.getAssets.select();

// creates memoized selector
const selectAssetData = createSelector(
  selectAsstsResult,
  (assetResult) => assetResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAssets,
  selectById: selectAssetById,
  selectIds: selectAssetsIds,
  // pass in selector that returns
} = assetsAdapter.getSelectors(
  (state) => selectAssetData(state) ?? initialState
);