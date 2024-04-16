import React from "react";
import "./index.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";

//Uvindya
import Navbar_Pay from "./components/Navbar-uvi.jsx";
//import { useAuthContext } from './hooks/useAuthContext';
import Home from "./pages/Home-Salary.jsx";
//import Login from './pages/Login.jsx';
//import Signup from './pages/Signup.jsx';
//import ForgotPassword from './components/ForgotPassword.jsx';
//import SalaryDetails from './components/SalaryDetails.jsx';
import UpdateSalaryPage from "./components/UpdateSalary.jsx";
import AddSalaryPage from "./pages/AddSalary.jsx";
// import Logout from './pages/Logout.jsx'
import SalaryDetailsPage from "./pages/SalaryDetailsPage.jsx";

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
import DisSignup from "./pages/DisSignup.js";
import DisLogin from "./pages/DisLogin.js";
import DisDashboard from "./pages/DisDashboard.jsx";
import DisMyProfile from "./pages/DisMyProfile.jsx";
import DisAnalytics from "./pages/DisAnalytics";
import OrderPlace from "./pages/OrderPlacement.js";
import OrderHistory from "./pages/OrderHistory.js";
import OrderSuccess from "./pages/OrderSucess.js";
import UpdateOrder from "./pages/UpdateOrderDetails.js";
import { useDisDAuthContext } from "./hooks/useDisDAuthContext.js";
import HomePage from "./pages/DinHome.js";
// import OrderPlace from "./pages/OrderPlacement.js";
// import OrderHistory from "./pages/OrderHistory.js";
// import OrderSuccess from "./pages/OrderSucess.js";
// import UpdateOrder from "./pages/UpdateOrderDetails.js";

//Senith
import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import ProductionDashboard from "./pages/ProductionDashboard.jsx";
import SingleProduct from "./components/SingleProduct"; // Import SingleProduct
import EditProduct from "./components/EditProduct"; // Import EditProduct
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

// Auth
import PrivateRoute from "./route_auth/PrivateRoute.jsx";
import CheckLoginStatus from "./route_auth/CheckLoginStatus.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { USER_ROLES } from "./constants/roles.js";
import Signup from "./pages/signup/Signup.jsx";
const queryClient = new QueryClient();

const App = () => {
  const { distributor } = useDisDAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SalesContextProvider>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/Logout" element={<Logout />} />
              {/* Nishadi - SUPPLIER_CHAIN_SUPERVISOR */}
              <Route
                element={
                  <PrivateRoute
                    permissionLevel={[USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]}
                  />
                }
              >
                <Route
                  path="/supplier-chain-supervisor"
                  element={<DashboardN />}
                />
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
              </Route>
              {/* Shanali - EXPORT_MANAGER */}
              <Route
                element={
                  <PrivateRoute permissionLevel={[USER_ROLES.EXPORT_MANAGER]} />
                }
              >
                {/* <Route path="/" element={<ExportsDashboard />} /> */}
                <Route path="/export-manager" element={<ExportsDashboard />} />
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
              </Route>
              {/* Dulari - DONATION_MANAGER */}
              <Route
                element={
                  <PrivateRoute
                    permissionLevel={[USER_ROLES.DONATION_MANAGER]}
                  />
                }
              >
                <Route path="/New_Projects" element={<New_Projects />} />
                <Route path="/Doner_Feedback" element={<Doner_Feedback />} />
                <Route path="/Doner_Analytics" element={<Doner_Analystics />} />
                <Route path="/Dashboard" element={<DFeedbackFetch />} />
                <Route
                  path="/donation-manager"
                  element={<Donation_Dashboard />}
                />
              </Route>
              {/* Primal - SHOWROOM_AND_SALES_MANAGER */}
              <Route
                element={
                  <PrivateRoute
                    permissionLevel={[USER_ROLES.SHOWROOM_AND_SALES_MANAGER]}
                  />
                }
              >
                <Route path="/salesFeedback" element={<SalesFeedback />} />
                <Route path="/invoiceCreate" element={<InvoiceCreate />} />
                <Route path="/sfeedbackFetch" element={<SfeedbackFetch />} />
                <Route path="/viewInvoice" element={<ViewInvoice />} />
                <Route path="/PinVerification" element={<PinVerification />} />
                <Route path="/InvoiceUpdate" element={InvoiceUpdate} />
              </Route>
              {/* Dinithi - DISTRIBUTOR_MANAGER */}
              <Route
                element={
                  <PrivateRoute
                    permissionLevel={[USER_ROLES.DISTRIBUTOR_MANAGER]}
                  />
                }
              >
                <Route path="/distributor-manager" element={<HomePage />} />
                {/* <Route
                path="/login"
                element={
                  !distributor ? <DisLogin /> : <Navigate to="/DisDashboard" />
                }
              /> */}
                {/* <Route
                path="/signup"
                element={
                  !distributor ? <DisSignup /> : <Navigate to="/DisDashboard" />
                }
              /> */}
                {/* <Route
                path="/DisDashboard"
                element={
                  distributor ? <DisDashboard /> : <Navigate to="/login" />
                }
              /> */}
                <Route path="/distributor-manager" element={<DisDashboard />} />
                <Route path="/DisMyProfile" element={<DisMyProfile />} />
                <Route path="/DisAnalytics" element={<DisAnalytics />} />
                <Route path="/OrderForm" element={<OrderPlace />} />
                <Route path="/OrderHistory" element={<OrderHistory />} />
                <Route path="/OrderSuccess" element={<OrderSuccess />} />
                <Route path="/update/:id" element={<UpdateOrder />} />{" "}
                {/* Define route for updating orders */}
                <Route path="/OrderForm" element={<OrderPlace />} />
                <Route path="/OrderHistory" element={<OrderHistory />} />
                <Route path="/OrderSuccess" element={<OrderSuccess />} />
                <Route path="/update/:id" element={<UpdateOrder />} />{" "}
                {/* Define route for updating orders */}
              </Route>

              {/*Uvindya - USER_MANAGER*/}
              <Route
                element={
                  <PrivateRoute permissionLevel={[USER_ROLES.USER_MANAGER]} />
                }
              >
                <Route path="/user-manager" element={<Home />} />
                <Route
                  path="/updateSalary/:id"
                  element={<UpdateSalaryPage />}
                />
                <Route path="/add-salary" element={<AddSalaryPage />} />
                <Route path="/salary-details" element={<SalaryDetailsPage />} />
                <Route path="/Logout" element={<Logout />} />
              </Route>

              {/*Senith - INVENTORY_MANAGER*/}
              <Route
                element={
                  <PrivateRoute
                    permissionLevel={[USER_ROLES.INVENTORY_MANAGER]}
                  />
                }
              >
                <Route path="/Products" element={<Products />} />
                <Route path="/Production" element={<Production />} />
                <Route path="/Materials" element={<Materials />} />
                <Route path="/AddProducts" element={<AddProducts />} />
                <Route path="/ProductForm" element={<ProductForm />} />
                <Route
                  path="/inventory-manager"
                  element={<ProductionDashboard />}
                />
                <Route path="/EditProduct" element={<EditProduct />} />
                <Route path="/SingleProduct" element={<SingleProduct />} />
              </Route>

              {/* Auth */}
              {/* Check Login Status */}
              <Route element={<CheckLoginStatus />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              {/* all logged in users can access the profile page */}
              <Route
                element={
                  <PrivateRoute
                    permissionLevel={[
                      USER_ROLES.USER_MANAGER,
                      USER_ROLES.DISTRIBUTOR_MANAGER,
                      USER_ROLES.INVENTORY_MANAGER,
                      USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR,
                      USER_ROLES.EXPORT_MANAGER,
                      USER_ROLES.DONATION_MANAGER,
                      USER_ROLES.SHOWROOM_AND_SALES_MANAGER,
                      USER_ROLES.DISTRIBUTORS,
                    ]}
                  />
                }
              >
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </SalesContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
