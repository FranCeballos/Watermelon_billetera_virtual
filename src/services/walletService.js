import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://watermelon-backend.onrender.com/app/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
    },
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getBalanceAndMovements: builder.query({
      query: () => ({
        url: `balance`,
      }),
    }),
    postDeposit: builder.mutation({
      query: ({ ...deposit }) => ({
        url: "deposit",
        method: "post",
        body: deposit,
      }),
    }),
    postSend: builder.mutation({
      query: ({ ...send }) => ({
        url: "send",
        method: "post",
        body: send,
      }),
    }),
  }),
});

export const {
  useGetBalanceAndMovementsQuery,
  usePostDepositMutation,
  usePostSendMutation,
} = walletApi;
