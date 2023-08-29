import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dolarApi } from "../services/dolarService";
import { walletApi } from "../services/walletService";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dolarApi.reducerPath]: dolarApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dolarApi.middleware)
      .concat(walletApi.middleware),
});

setupListeners(store.dispatch);
