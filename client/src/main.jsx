import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// About our company
import About from "./pages/About";
// Order History
import MyOrders from "./pages/MyOrders.jsx";
import ErrorPage from "./pages/ErrorPage";
import Detail from "./pages/Detail";
import Success from "./pages/Success";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/myOrders",
        element: <MyOrders />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products/:id",
        element: <Detail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
