import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const asstesAdapter = createEntityAdapter({})

const initialState = asstesAdapter.getInitialState()

export const asstesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // getAssets
    })
})