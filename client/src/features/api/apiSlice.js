import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localost:3500'}),
    tagTypes: ['Asset'],
    endpoints: builder => ({})
})