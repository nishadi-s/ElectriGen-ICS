/*import React from "react";
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
import OrderPlace from "./pages/OrderPlacement.js";
import OrderHistory from "./pages/OrderHistory.js";
import OrderSuccess from "./pages/OrderSucess.js";
import UpdateOrder from "./pages/UpdateOrderDetails.js";
//Senith
import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import ProductForm from "./components/ProductForm";

//Shanali
import ExportsDashboard from "./pages/ExportsDashboard.jsx";
import ExportsNavBar from "./components/ExportsNavBar.jsx";
import ExportsProfile from "./pages/ExportsProfile.jsx";
import ExportOrderDetails from "./pages/ExportOrderDetails.jsx";
import ExportOrders from "./pages/ExportOrders.jsx";
import Importer from "./pages/Importer.jsx";
import ExportAnalytics from "./pages/ExportAnalytics.jsx";
import UpdateExports from "./pages/UpdateExports.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <SalesContextProvider>
        <Navbar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/Logout" element={<Logout />} />
            {/* Shanali */}
            <Route path="/" element={<ExportsDashboard />} />
            <Route path="/ExportsDashboard" element={<ExportsDashboard />} />
            <Route path="/Importer" element={<Importer />} />
            <Route path="/ExportOrders" element={<ExportOrders />} />
            <Route
              path="/ExportOrderDetails"
              element={<ExportOrderDetails />}
            />
            <Route path="/ExportAnalytics" element={<ExportAnalytics />} />
            <Route path="/ExportsProfile" element={<ExportsProfile />} />
            <Route path="/update/:id" element={<UpdateExports />} />{" "}
            {/* Define route for updating orders */}
            {/* Dulari */}
            <Route path="/New_Projects" element={<New_Projects />} />
            <Route path="/Doner_Feedback" element={<Doner_Feedback />} />
            <Route path="/Doner_Analytics" element={<Doner_Analystics />} />
            <Route path="/Dashboard" element={<DFeedbackFetch />} />
            <Route
              path="/Donation_Dashboard"
              element={<Donation_Dashboard />}
            />
            {/* Primal */}
            <Route path="/salesFeedback" element={<SalesFeedback />} />
            <Route path="/invoiceCreate" element={<InvoiceCreate />} />
            <Route path="/sfeedbackFetch" element={<SfeedbackFetch />} />
            <Route path="/viewInvoice" element={<ViewInvoice />} />
            <Route path="/PinVerification" element={<PinVerification />} />
            <Route path="/InvoiceUpdate" element={InvoiceUpdate} />
            {/* Dinithi */}
            <Route path="/OrderForm" element={<OrderPlace />} />
            <Route path="/OrderHistory" element={<OrderHistory />} />
            <Route path="/OrderSuccess" element={<OrderSuccess />} />
            <Route path="/update/:id" element={<UpdateOrder />} />{" "}
            {/* Define route for updating orders */}
            {/*Senith */}
            <Route path="/Products" element={<Products />} />
            <Route path="/Production" element={<Production />} />
            <Route path="/Materials" element={<Materials />} />
            <Route path="/AddProducts" element={<AddProducts />} />
            <Route path="./components/ProductForm" component={ProductForm} />
          </Routes>
        </Navbar>
      </SalesContextProvider>
    </BrowserRouter>
  );
};

export default App;*/

//Nishadi
import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/SupplierOrderNavbar.jsx";
import Dashboard from "./pages/SupplierOrderDashboard.jsx";
import MyProfile from "./pages/SupplierOrderProfile.jsx";
import Orders from "./pages/SupplierOrder_Order.jsx";
import Suppliers from "./pages/SupplierOrderSuppliers.jsx";
import Analytics from "./pages/SupplierOrderAnalytics.jsx";
import UpdateOrder from "./components/SupplierOrderUpdate.jsx"; // Import the UpdateOrder component
import SupplierEdit from "./components/SupplierEdit.jsx"; // Import the UpdateSupplier component



//Nishadi
const App = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/SupplierOrderDashboard" element={<Dashboard />} />
          <Route path="/Suppliers" element={<Suppliers />} />
          <Route path="/Order" element={<Orders />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/update/:id" element={<UpdateOrder />} /> {/* Define route for updating orders */}
          <Route path="Suppliers/supplieredit" element={<SupplierEdit />} /> {/* Define route for updating orders */}
          <Route path="/Suppliers/supplieredit/Suppliers" element={<Suppliers />} />
         

        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default App;