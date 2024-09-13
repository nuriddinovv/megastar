import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Product from "./pages/productsPage/Products";
import PageNotFound from "./pages/404Page/PageNotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "products", element: <Product /> },
  // Page Not Found
  { path: "*", element: <PageNotFound /> }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
