import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// About our company
import About from "./pages/About";
// Order History
import Profile from "./pages/Profile.jsx";
import ErrorPage from "./pages/ErrorPage";
import ProductDetail from "./pages/ProductDetail.jsx";
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/myprofile",
        element: <Profile />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
