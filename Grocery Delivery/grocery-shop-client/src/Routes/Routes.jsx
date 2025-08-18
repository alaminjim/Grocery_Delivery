import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import ProductCategory from "../Pages/ProductCategory";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import AddAddress from "../Pages/AddAddress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-product",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/all-product/:category",
        element: <ProductCategory></ProductCategory>,
      },
      {
        path: "/product/:category/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/add-address",
        element: <AddAddress></AddAddress>,
      },
    ],
  },
]);

export default router;
