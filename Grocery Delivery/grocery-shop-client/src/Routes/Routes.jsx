import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import ProductCategory from "../Pages/ProductCategory";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import AddAddress from "../Pages/AddAddress";
import MyOrders from "../Pages/MyOrders";
import Loader from "../Components/Loader";
import SellerDashboard from "../Components/Seller/SellerDashboard";
import AddProduct from "../Pages/Seller/AddProduct";
import ProductList from "../Pages/Seller/ProductList";
import Order from "../Pages/Seller/Order";

const router = createBrowserRouter([
  {
    path: "/loader",
    element: <Loader />,
  },
  {
    path: "/",
    element: <Layouts />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-product", element: <AllProducts /> },
      { path: "/all-product/:category", element: <ProductCategory /> },
      { path: "/product/:category/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/add-address", element: <AddAddress /> },
      { path: "/my-orders", element: <MyOrders /> },
    ],
  },
  {
    path: "/seller",
    element: <SellerDashboard />,
    children: [
      { path: "/seller", element: <AddProduct /> },
      { path: "/seller/product-list", element: <ProductList /> },
      { path: "/seller/order", element: <Order /> },
    ],
  },
]);

export default router;
