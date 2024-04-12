import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";

//Senith
import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import ProductionDashboard from "./pages/ProductionDashboard.jsx";
import SingleProduct from "./components/SingleProduct"; // Import SingleProduct
import EditProduct from "./components/EditProduct"; // Import EditProduct

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/Logout" element={<Logout />} />
        {/*Senith */}
        <Route path="/Products" element={<Products />} />
        <Route path="/Production" element={<Production />} />
        <Route path="/Materials" element={<Materials />} />
        <Route path="/AddProducts" element={<AddProducts />} />
        <Route path="/ProductionDashboard" element={<ProductionDashboard />} />
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />{" "}
        {/* Define route for single product */}
        <Route path="/edit-product/:id" element={<EditProduct />} />{" "}
        {/* Add EditProduct route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
