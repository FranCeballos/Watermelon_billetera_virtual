import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authService";
import userSlice from "./reducers/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dolarApi } from "../services/dolarService";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [dolarApi.reducerPath]: dolarApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dolarApi.middleware),
});

setupListeners(store.dispatch);
