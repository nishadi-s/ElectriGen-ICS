import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";

//Dulari_IT22121110
import DonationNavbar from "./components/DonationNavbar.jsx";
import Donation_Dashboard from "./pages/Donation_Dashboard.jsx";
import New_Projects from "./pages/New_Projects.jsx";
import Doner_Feedback from "./pages/Doner_Feedback.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Doner_Analystics from "./pages/Doner_Analytics.jsx";
import DFeedbackFetch from "./components/dFeedbackFetch.jsx";

//Primal
import SalesFeedback from "./pages/salesFeedback.jsx";
import InvoiceCreate from "./pages/invoiceCreate.jsx";
import SfeedbackFetch from "./components/sfeedbackFetch.jsx";
import ViewInvoice from "./pages/viewInvoice.jsx";
import PinVerification from "./components/PinVerification.jsx";
import { SalesContextProvider } from "./context/SalesContext.jsx";
import InvoiceUpdate from "./pages/InvoiceUpdate.jsx";

//Dinithi
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
    <SalesContextProvider>
      <Navbar>
      <div className="pages">
        <Routes>

      
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />
            
          {/* Dulari */}
          <Route path="/New_Projects" element={<New_Projects />} />
          <Route path="/Doner_Feedback" element={<Doner_Feedback />} />
          <Route path="/Doner_Analytics" element={<Doner_Analystics />} />
          <Route path="/DFeedbackFetch" element={<DFeedbackFetch />} />
          
          <Route path="/DProjectDetails" element={<DProjectDetails />} />
         


          {/* Primal */}
          <Route path="/salesFeedback" element={<SalesFeedback />} />
          <Route path="/invoiceCreate" element={<InvoiceCreate />} />
          <Route path="/sfeedbackFetch" element={<SfeedbackFetch />} />
          <Route path="/viewInvoice" element={<ViewInvoice />} />
          <Route path="/PinVerification" element={<PinVerification />} />
          <Route path="/InvoiceUpdate" element={InvoiceUpdate} />

          {/* Dinithi */}
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
      </Navbar>
      </SalesContextProvider>
    </BrowserRouter>
    </div>
  );
};

export default App;
