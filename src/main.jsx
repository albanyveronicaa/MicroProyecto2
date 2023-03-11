import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HOME_URL, LOGIN_URL, REGISTER_URL } from "../src/constants/urls";
import { HomePage } from "./pages/Home/HomePage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path={HOME_URL}
          element={
            //TODO CAMBIAR A PRIVATE
            <PublicRoute> 
              <HomePage />
            </PublicRoute>
          }
        />

        <Route
          path={REGISTER_URL}
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path={LOGIN_URL}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<h1>PÁGINA NO ENCONTRADA</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
