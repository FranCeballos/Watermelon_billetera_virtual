import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    postSignup: builder.mutation({
      query: ({ ...auth }) => ({
        url: `auth/signup`,
        method: "POST",
        body: auth,
      }),
    }),
    postLogin: builder.mutation({
      query: ({ ...auth }) => ({
        url: `auth/login`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { usePostSignupMutation, usePostLoginMutation } = authApi;
