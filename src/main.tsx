import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";
import Protected from "./components/Protected.tsx";
import User from "./pages/User.tsx";
import Products from "./pages/Products.tsx";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route
      path="/dashboard"
      element={
        <Protected>
          <Dashboard />
        </Protected>
      }
    >
      <Route path="user" element={<User />} />
      <Route path="products" element={<Products />} />
    </Route>
    <Route path="/auth/register" element={<Register />} />
    <Route path="/auth/login" element={<Login />} />
  </Route>
);

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
