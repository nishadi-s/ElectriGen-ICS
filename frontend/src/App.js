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

const App = () => {
  return (
    <BrowserRouter>
      <Navbar>
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
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default App;
