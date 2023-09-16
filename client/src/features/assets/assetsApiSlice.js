import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const assetsAdapter = createEntityAdapter({})

const initialState = assetsAdapter.getInitialState()

export const asstesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAssets: builder.query({
            query: () => 'assets',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAssets = responseData.map( asset => {
                    asset.id = asset._id
                    return asset
                });
                return assetsAdapter.setAll(initialState, loadedAssets)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Asset', id: 'LIST'},
                        ...result.ids.map( id => ({ type: 'Asset', id}))
                    ]
                } else return [{type: 'Asset', id: 'LIST'}]
            }
        }),
        addNewAsset: builder.mutation({
            query: initialAssetData => ({
                url: '/assets',
                method: 'POST',
                body: {
                    ...initialAssetData
                }
            }),
            invalidatesTags: [
                {type: 'Asset', id: 'LIST'}
            ]
        })
    })
})

export const {
    useGetAssetsQuery,
    useAddNewAssetMutation
} = asstesApiSlice

export const selectAssetsResult =asstesApiSlice.endpoints.getAssets.select()

const selectAssetsData = createSelector(
    selectAssetsResult,
    assetsResult => assetsResult.data
)

export const {
    selectAll: selectAllAssets,
    selectById: selectAssetsById,
    selectIds: selectAssetsIds
} = assetsAdapter.getSelectors(state => selectAssetsData(state) ?? initialState)