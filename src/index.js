import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import AuthPage from "./routes/AuthPage";
import ErrorPage from "./routes/ErrorPage";
import AppPage from "./routes/AppPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { checkAuthLoader } from "./util/auth";
import { action as logoutAction } from "./routes/Logout";
import { Analytics } from "@vercel/analytics";

const router = createBrowserRouter([
  { path: "/", loader: () => redirect("/auth"), errorElement: <ErrorPage /> },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "app",
    element: <AppPage />,
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
  },
  {
    path: "logout",
    action: logoutAction,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Analytics />
    </Provider>
  </React.StrictMode>
);
