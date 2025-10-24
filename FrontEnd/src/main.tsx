import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer />
    <AppRoutes />
  </BrowserRouter>
);
