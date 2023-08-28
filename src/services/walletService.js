import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/app/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.value.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getBalanceAndMovements: builder.query({
      query: (token, _id) => ({
        url: `/data/main/${_id}/${token}`,
      }),
    }),
  }),
});
