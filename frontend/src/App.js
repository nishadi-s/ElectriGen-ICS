import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes, Switch, Navigate } from "react-router-dom";

//dinithi
import { useDisDAuthContext } from "./hooks/useDisDAuthContext.js";
import HomePage from "./pages/DinHome.js";

import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";

//Dinithi

import DisSignup from "./pages/DisSignup.js";
import DisLogin from "./pages/DisLogin.js";
import DisDashboard from "./pages/DisDashboard.jsx";
import DisMyProfile from "./pages/DisMyProfile.jsx";
import DisAnalytics from "./pages/DisAnalytics";
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

  const { distributor } = useDisDAuthContext()

  return (
    <div className="App">
    <BrowserRouter>
      <div className="pages">
        <Routes>

          {/* Senith */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />

          {/* Dinithi */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element = {!distributor ? <DisLogin /> : <Navigate to= "/DisDashboard"/>} />
          <Route path="/signup" element = {!distributor ? <DisSignup /> : <Navigate to= "/DisDashboard"/>} />
          
          <Route path="/DisDashboard" element = {distributor ? <DisDashboard /> : <Navigate to="/login" />}/>
          <Route path="/DisMyProfile" element = {<DisMyProfile />} />
          <Route path="/DisAnalytics" element = {<DisAnalytics />} />
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
