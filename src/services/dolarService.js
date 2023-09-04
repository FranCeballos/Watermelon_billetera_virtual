import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dolarApi = createApi({
  reducerPath: "dolarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bluelytics.com.ar/v2/latest",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getDolarValueInArs: builder.query({
      query: () => ({
        url: "",
      }),
    }),
  }),
});

export const { useGetDolarValueInArsQuery } = dolarApi;
