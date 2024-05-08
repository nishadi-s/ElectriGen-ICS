import React, { useEffect } from "react";
import "./index.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";
import Home from "./pages/Home.jsx";

/*Uvindya
//import Navbar_Pay from './components/Navbar-uvi.jsx';
//import { useAuthContext } from './hooks/useAuthContext';
//import Home from './pages/Home-Salary.jsx'
//import Login from './pages/Login.jsx';
//import Signup from './pages/Signup.jsx';
//import ForgotPassword from './components/ForgotPassword.jsx';
//import SalaryDetails from './components/SalaryDetails.jsx';
import UpdateSalaryPage from "./components/UpdateSalary.jsx";
import AddSalaryPage from "./pages/AddSalary.jsx";
import Logout from "./pages/Logout.jsx";
import SalaryDetailsPage from "./pages/SalaryDetailsPage.jsx";*/

//Nishadi
import NavbarNishadi from "./components/SupplierOrderNavbar.jsx";
import DashboardN from "./pages/SupplierOrderDashboard.jsx";
import MyProfileN from "./pages/SupplierOrderProfile.jsx";
import Orders from "./pages/SupplierOrder_Order.jsx";
import Suppliers from "./pages/SupplierOrderSuppliers.jsx";
import AnalyticsN from "./pages/SupplierOrderAnalytics.jsx";
//import UpdateOrderN from "./components/SupplierOrderUpdate.jsx"; // Import the UpdateOrder component
import SupplierEdit from "./components/SupplierEdit.jsx"; // Import the UpdateSupplier component

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

import DisSignup from "./pages/DisSignup.jsx";
import DisLogin from "./pages/DisLogin.jsx";
import DisDashboard from "./pages/DisDashboard.jsx";
import DisMyProfile from "./pages/DisMyProfile.jsx";
import DisAnalytics from "./pages/DisAnalytics";
import OrderPlace from "./pages/OrderPlacement.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import OrderSuccess from "./pages/OrderSucess.jsx";
import UpdateOrder from "./pages/UpdateOrderDetails.jsx";
import { useDisDAuthContext } from "./hooks/useDisDAuthContext.jsx";
//distribution managers

//Senith
import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import AddProduction from "./pages/AddProduction.jsx";
import ProductionDashboard from "./pages/ProductionDashboard.jsx";
import SingleProduct from "./components/SingleProduct";
import EditProduct from "./components/EditProduct";
import EditProduction from "./components/EditProduction";
import EditMaterial from "./components/EditMaterial";
import ProductionAnalytics from "./pages/ProductionAnalytics.jsx";
import ProductionProfile from "./pages/ProductionProfile.jsx";
import ProductForm from "./components/ProductForm";
import ProductsView from "./pages/ProductView";
import MaterialsView from "./pages/MaterialsView";
import AddMaterials from "./pages/AddMaterials";
import Welcome from "./pages/welcome.jsx";

/*Shanali
import ExportsDashboard from "./pages/ExportsDashboard.jsx";
import ExportsNavBar from "./components/ExportsNavBar.jsx";
import ExportsProfile from "./pages/ExportsProfile.jsx";
/*import ImporterDescription from "./pages/ImporterDescription.jsx";
import ImporterDescription from "./pages/ImporterDescription.jsx";
import ExportOrders from "./pages/ExportOrders.jsx";
import Importer from "./pages/Importer.jsx";
import ExportAnalytics from "./pages/ExportAnalytics.jsx";
import UpdateExports from "./pages/UpdateExports.jsx";
import ImporterUpdate from "./pages/ImporterUpdate.jsx";*/

const App = () => {
  useEffect(() => {
    document.title = "ElectriGen";
  }, []);

  const { distributor } = useDisDAuthContext();

  return (
    <BrowserRouter>
      <SalesContextProvider>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/Logout" element={<Logout />} />
            {/* Nishadi */}
            <Route path="/SupplierOrderDashboard" element={<DashboardN />} />
            <Route path="/Suppliers" element={<Suppliers />} />
            <Route path="/Order" element={<Orders />} />
            <Route path="/analytics" element={<AnalyticsN />} />
            <Route path="/MyProfile" element={<MyProfileN />} />
            <Route path="/update/:id" element={<UpdateOrder />} />{" "}
            {/* Define route for updating orders */}
            <Route
              path="Suppliers/supplieredit"
              element={<SupplierEdit />}
            />{" "}
            {/* Define route for updating orders */}
            <Route
              path="/Suppliers/supplieredit/Suppliers"
              element={<Suppliers />}
            />
            {/* Shanali 
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
            <Route path="/InvoiceUpdate" element={<InvoiceUpdate />} />
            {/* Dinithi */}
            <Route
              path="/login"
              element={
                !distributor ? <DisLogin /> : <Navigate to="/DisDashboard" />
              }
            />
            <Route
              path="/signup"
              element={
                !distributor ? <DisSignup /> : <Navigate to="/DisDashboard" />
              }
            />
            <Route
              path="/DisDashboard"
              element={
                distributor ? <DisDashboard /> : <Navigate to="/login" />
              }
            />
            <Route path="/DisMyProfile" element={<DisMyProfile />} />
            <Route path="/DisAnalytics" element={<DisAnalytics />} />
            <Route path="/OrderForm" element={<OrderPlace />} />
            <Route path="/OrderHistory" element={<OrderHistory />} />
            <Route path="/OrderSuccess" element={<OrderSuccess />} />
            <Route path="/update/:id" element={<UpdateOrder />} />{" "}
            {/* Define route for updating orders */}
            {/* Define route for updating orders */}
            {/*Uvindya
            <Route path="/" element={<Home />} />
            <Route path="/updateSalary/:id" element={<UpdateSalaryPage />} />
            <Route path="/add-salary" element={<AddSalaryPage />} />
            <Route path="/salary-details" element={<SalaryDetailsPage />} />
            <Route path="/Logout" element={<Logout />} />*/}
            {/*Senith*/}
            <Route path="/Products" element={<Products />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/Production" element={<Production />} />
            <Route path="/Materials" element={<Materials />} />
            <Route path="/AddProducts" element={<AddProducts />} />
            <Route path="/AddProduction" element={<AddProduction />} />
            <Route
              path="/ProductionAnalytics"
              element={<ProductionAnalytics />}
            />
            <Route path="/ProductForm" element={<ProductForm />} />
            <Route
              path="/ProductionDashboard"
              element={<ProductionDashboard />}
            />
            <Route path="/ProductionProfile" element={<ProductionProfile />} />
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/update-production/:id" element={<EditProduction />} />
            <Route path="/EditProduct" element={<EditProduct />} />
            <Route path="/edit-material/:id" element={<EditMaterial />} />
            <Route path="/SingleProduct" element={<SingleProduct />} />
            <Route path="/ProductsView" element={<ProductsView />} />
            <Route path="/MaterialsView" element={<MaterialsView />} />
            <Route path="/AddMaterials" element={<AddMaterials />} />
          </Routes>
        </div>
      </SalesContextProvider>
    </BrowserRouter>
  );
};

export default App;
