import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://watermelon-backend.onrender.com/auth/",
  }),
  endpoints: (builder) => ({
    postSignup: builder.mutation({
      query: ({ ...auth }) => ({
        url: `signup`,
        method: "POST",
        body: auth,
      }),
    }),
    postLogin: builder.mutation({
      query: ({ ...auth }) => ({
        url: `login`,
        method: "POST",
        body: auth,
      }),
    }),
    getWakeup: builder.query({
      query: () => ({
        url: "wakeup",
      }),
    }),
  }),
});

export const {
  usePostSignupMutation,
  usePostLoginMutation,
  useLazyGetWakeupQuery,
} = authApi;
