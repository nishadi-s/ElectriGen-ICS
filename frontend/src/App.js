import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";

//Primal
import SalesFeedback from "./pages/salesFeedback.jsx";
import InvoiceCreate from "./pages/invoiceCreate.jsx";
import SfeedbackFetch from "./components/sfeedbackFetch.jsx";
import ViewInvoice from "./pages/viewInvoice.jsx";
import PinVerification from "./components/PinVerification.jsx";
import { SalesContextProvider } from "./context/SalesContext.jsx";
import InvoiceUpdate from "./pages/InvoiceUpdate.jsx";
import InvoiceReport from "./pages/InvoiceReport.jsx";
import SalesDashboard from "./pages/SalesDashboard.jsx";
import SDFeedback from "./pages/SDFeedback";
import SDView from "./pages/SDView.jsx";

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
      
      <div className="pages">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />


          {/*primal*/}
          <Route path="/salesFeedback" element={<SalesFeedback />} />
          <Route path="/invoiceCreate" element={<InvoiceCreate />} />
          <Route path="/sfeedbackFetch" element={<SfeedbackFetch />} />
          <Route path="/viewInvoice" element={<ViewInvoice />} />
          <Route path="/PinVerification" element={<PinVerification />} />
          <Route path="/InvoiceUpdate/:billID" element={<InvoiceUpdate />} />
          <Route path="/InvoiceReport" element={<InvoiceReport />} />
          <Route path="/SalesDashboard" element={<SalesDashboard />} />
          <Route path="/SDFeedback" element={<SDFeedback />} />
          <Route path="/SDView" element={<SDView />} />

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
      
      </SalesContextProvider>
    </BrowserRouter>
    </div>
  );
};

export default App;
