import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import ProductCategory from "../Pages/ProductCategory";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import AddAddress from "../Pages/AddAddress";
import MyOrders from "../Pages/MyOrders";
import SellerDashboard from "../Components/Seller/SellerDashboard";
import AddProduct from "../Pages/Seller/AddProduct";
import ProductList from "../Pages/Seller/ProductList";
import Order from "../Pages/Seller/Order";

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
      {
        path: "/my-orders",
        element: <MyOrders></MyOrders>,
      },
    ],
  },
  {
    path: "/seller",
    element: <SellerDashboard></SellerDashboard>,
    children: [
      {
        path: "/seller/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/seller/product-list",
        element: <ProductList></ProductList>,
      },
      {
        path: "/seller/order",
        element: <Order></Order>,
      },
    ],
  },
]);

export default router;
