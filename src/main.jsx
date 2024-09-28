import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Product from "./pages/productsPage/Products";
import PageNotFound from "./pages/404Page/PageNotFound";
import Sale from "./pages/salePage/Sale";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      { path: "/", element: <Home /> },
      { path: "products", element: <Product /> },
      { path: "sale", element: <Sale /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
