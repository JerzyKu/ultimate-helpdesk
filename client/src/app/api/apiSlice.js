import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://playstation-chicks-cc-worcester.trycloudflare.com",
  // baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log('args', args ); // request url, method, body
  // console.log('api', api); // signal, dispatch, getState()
  // console.log('extraOptions', extraOptions); // custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sendig refresh token");

    // send refresch teken to get new access token
    const refreshResult = await baseQuery("auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry orginal query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Asset", "User"],
  endpoints: (builder) => ({}),
});
