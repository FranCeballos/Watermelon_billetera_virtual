import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./routes/AuthPage";
import ErrorPage from "./routes/ErrorPage";
import AppPage from "./routes/AppPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { checkAuthLoader } from "./util/checkAuthLoader";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
