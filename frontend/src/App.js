import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Senith
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Products from "./pages/Products.jsx";
import Materials from "./pages/Materials.jsx";
import Analytics from "./pages/Analytics.jsx";
import Production from "./pages/Production.jsx";
import Logout from "./pages/Logout.jsx";

//Dinithi
import OrderPlace from './pages/OrderPlacement.js'
import OrderHistory from './pages/OrderHistory.js';
import OrderSuccess from './pages/OrderSucess.js';
import UpdateOrder from './pages/UpdateOrderDetails.js';

const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar>
      <div className="pages">
        <Routes>
          {/* Senith */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Materials" element={<Materials />} />
          <Route path="/Production" element={<Production />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />

          {/* Dinithi */}
          <Route path="/OrderForm" element = {<OrderPlace />} />
            <Route path="/OrderHistory" element = {<OrderHistory />} />
            <Route path="/OrderSuccess" element={<OrderSuccess/>}/>
            <Route path="/update/:id" element={<UpdateOrder />} /> {/* Define route for updating orders */}

        </Routes>
        </div>
      </Navbar>
    </BrowserRouter>
    </div>
  );
};

export default App;
