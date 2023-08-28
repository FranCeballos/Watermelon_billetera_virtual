import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/app/" }),
  endpoints: (builder) => ({
    getBalanceAndMovements: builder.query({
      query: (token, _id) => ({
        url: `/data/main/${_id}/${token}`,
      }),
    }),
  }),
});
