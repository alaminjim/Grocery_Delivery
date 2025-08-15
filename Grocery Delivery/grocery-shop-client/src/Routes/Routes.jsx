import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";

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
    ],
  },
]);

export default router;
