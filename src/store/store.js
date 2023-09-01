import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dolarApi } from "../services/dolarService";
import { walletApi } from "../services/walletService";
import movementsReducer from "./slices/movementsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movements: movementsReducer,
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
