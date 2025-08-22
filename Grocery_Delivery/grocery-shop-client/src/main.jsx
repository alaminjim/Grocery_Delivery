import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./Context/AppContext.jsx";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <RouterProvider router={router}>
      <PrivateRoute>
        <Toaster />
        <ScrollToTop />
      </PrivateRoute>
    </RouterProvider>
  </AppContextProvider>
);
