import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import Warehouses from "./components/Warehouses";
import NavBar from "./components/NavBar";
import WarehouseDetails from "./components/WarehouseDetails";

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="warehouses" />} />
        <Route path="warehouses" element={<Warehouses />} />
        <Route path="warehouses/:Id" element={<WarehouseDetails />} />
        <Route path="*" element={<h1>NoThing Here!!!</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
