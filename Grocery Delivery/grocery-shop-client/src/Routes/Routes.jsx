import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
  },
]);

export default router;
