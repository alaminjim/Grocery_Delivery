import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./Context/AppContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
