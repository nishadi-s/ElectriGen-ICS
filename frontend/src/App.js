import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Products from "./pages/Products.jsx";
import Materials from "./pages/Materials.jsx";
import Analytics from "./pages/Analytics.jsx";
import Production from "./pages/Production.jsx";
import Logout from "./pages/Logout.jsx";
import SalesFeedback from "./pages/salesFeedback.jsx";
import InvoiceCreate from "./pages/invoiceCreate.jsx";
import SfeedbackFetch from "./components/sfeedbackFetch.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Materials" element={<Materials />} />
          <Route path="/Production" element={<Production />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/salesFeedback" element={<SalesFeedback />} />
          <Route path="/invoiceCreate" element={<InvoiceCreate />} />
          <Route path="/sfeedbackFetch" element={<SfeedbackFetch />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default App;
