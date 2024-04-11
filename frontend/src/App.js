import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

//dinithi
import HomePage from "./pages/DinHome.js";

import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";
//Dinithi

import DisSignup from "./pages/DisSignup.js";
import DisLogin from "./pages/DisLogin.js";
import OrderPlace from './pages/OrderPlacement.js'
import OrderHistory from './pages/OrderHistory.js';
import OrderSuccess from './pages/OrderSucess.js';
import UpdateOrder from './pages/UpdateOrderDetails.js';
//Senith
import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import ProductForm from "./components/ProductForm";


const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <div className="pages">
        <Routes>
          {/* dinithi */}
          <Route path="/" element={<HomePage />} />

          {/* Senith */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />

          {/* Dinithi */}
          <Route path="/login" element = {<DisLogin />} />
          <Route path="/signup" element = {<DisSignup />} />
          
          <Route path="/OrderForm" element = {<OrderPlace />} />
          <Route path="/OrderHistory" element = {<OrderHistory />} />
          <Route path="/OrderSuccess" element={<OrderSuccess/>}/>
          <Route path="/update/:id" element={<UpdateOrder />} /> {/* Define route for updating orders */}

          {/*Senith */}
          <Route path="/Products" element={<Products />} />
          <Route path="/Production" element={<Production />} />
          <Route path="/Materials" element={<Materials />} />
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="./components/ProductForm" component={ProductForm} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
