import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./routes/AuthPage";
import ErrorPage from "./routes/ErrorPage";
import AppPage from "./routes/AppPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { checkAuthLoader } from "./util/auth";
import { action as logoutAction } from "./routes/Logout";

const router = createBrowserRouter([
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
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
