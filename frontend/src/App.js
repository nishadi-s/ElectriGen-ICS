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
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";

import Navbar_Pay from "./components/Navbar-uvi.jsx";
import Home_Pay from "./pages/Home-Salary.jsx";
import UpdateSalaryPage from "./components/UpdateSalary.jsx";
import AddSalaryPage from "./pages/AddSalary.jsx";
import SalaryReportPage from "./pages/SalaryReport.jsx";
import SalaryDetailsPage from "./pages/SalaryDetailsPage.jsx";
import AllReport from "./pages/SalaryAllPdf.jsx";
import UserInfo from "./components/UserInfo.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import PrivateRoute from "./route_auth/PrivateRoute.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

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
import InvoiceReport from "./pages/InvoiceReport.jsx";
import SalesDashboard from "./pages/SalesDashboard.jsx";
import SDFeedback from "./pages/SDFeedback";
import SDView from "./pages/SDView.jsx";
import SalesAna from "./pages/SalesAna.jsx";

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
import DisMOrderHistory from "./pages/DisMOrderHistory.jsx";
import DisMDashboard from "./pages/DisMDashboard.jsx";
import DisMUpdateOrder from "./pages/DisMUpdate.jsx";

//Senith
import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import AddProduction from "./pages/AddProduction.jsx";
import ProductionDashboard from "./pages/ProductionDashboard.jsx";
import SingleProduct from "./components/SingleProduct"; // Import SingleProduct
import EditProduct from "./components/EditProduct"; // Import EditProduct
import EditMaterial from "./components/EditMaterial"; // Import EditProduct
import ProductionAnalytics from "./pages/ProductionAnalytics.jsx";
import ProductionProfile from "./pages/ProductionProfile.jsx";
import ProductForm from "./components/ProductForm";
import ProductsView from "./pages/ProductView";
import AddMaterials from "./pages/AddMaterials";

/*Shanali
import ExportsDashboard from "./pages/ExportsDashboard.jsx";
import ExportsNavBar from "./components/ExportsNavBar.jsx";
import ExportsProfile from "./pages/ExportsProfile.jsx";
import ImporterDescription from "./pages/ImporterDescription.jsx";
import ExportOrders from "./pages/ExportOrders.jsx";
import Importer from "./pages/Importer.jsx";
import ExportAnalytics from "./pages/ExportAnalytics.jsx";
import UpdateExports from "./pages/UpdateExports.jsx";
import ImporterUpdate from "./pages/ImporterUpdate.jsx";*/

// New Auth
import NewLogin from "./pages/new-login/Login.jsx";
import NewSignup from "./pages/new-signup/Signup.jsx";
import CheckLoginStatus from "./route_auth/CheckLoginStatus.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "./components/userProfile.jsx";
const queryClient = new QueryClient();

const App = () => {
  const { distributor } = useDisDAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SalesContextProvider>
          <div className="pages">
            <Routes>
              {/* Check Login Status */}
              <Route element={<CheckLoginStatus />}>
                <Route path="/new-login" element={<NewLogin />} />
                <Route path="/new-signup" element={<NewSignup />} />
              </Route>
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/Logout" element={<Logout />} />
              {/*Uvindya-user*/}
              {/*denying access to home before login */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/user-details" element={<UserInfo />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
              <Route path="/Home_Pay" element={<Home_Pay />} />
              <Route path="/updateSalary/:id" element={<UpdateSalaryPage />} />
              <Route path="/add-salary" element={<AddSalaryPage />} />
              <Route path="/salary-details" element={<SalaryDetailsPage />} />
              <Route path="/salary-report" element={<SalaryReportPage />} />
              <Route path="/all-salary-report" element={<AllReport />} />
              <Route path="user-profile" element={<UserProfile />} />
              <Route path="/Logout" element={<Logout />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:id/:token"
                element={<ResetPassword />}
              ></Route>
              <Route path="/Dashboard" element={<Dashboard />} />
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
          <Route path="/InvoiceUpdate/:billID" element={<InvoiceUpdate />} />
          <Route path="/InvoiceReport" element={<InvoiceReport />} />
          <Route path="/SalesDashboard" element={<SalesDashboard />} />
          <Route path="/SDFeedback" element={<SDFeedback />} />
          <Route path="/SDView" element={<SDView />} />
          <Route path="/InvoiceUpdate/:billID" element={<InvoiceUpdate />} />
          <Route path="/InvoiceReport" element={<InvoiceReport />} />
          <Route path="/SalesDashboard" element={<SalesDashboard />} />
          <Route path="/SDFeedback" element={<SDFeedback />} />
          <Route path="/SDView" element={<SDView />} />
          <Route path="/SalesAna" element={<SalesAna />} />
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
              {/* Dis manager */}
              <Route path="/DisMOrderHistory" element={<DisMOrderHistory />} />
              <Route path="/DisMDashboard" element={<DisMDashboard />} />
              <Route path="update-order/:id" element={<DisMUpdateOrder />} />
              {/*Senith*/}
              <Route path="/Products" element={<Products />} />
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
              <Route
                path="/ProductionProfile"
                element={<ProductionProfile />}
              />
              <Route path="/" element={<Products />} />
              <Route path="/product/:id" element={<SingleProduct />} />{" "}
              {/* Define route for single product */}
              <Route path="/edit-product/:id" element={<EditProduct />} />{" "}
              {/* Add EditProduct route */}
              <Route path="/EditProduct" element={<EditProduct />} />
              <Route
                path="/edit-material/:id"
                element={<EditMaterial />}
              />{" "}
              <Route path="/SingleProduct" element={<SingleProduct />} />
              <Route path="/ProductsView" element={<ProductsView />} />
              <Route path="/AddMaterials" element={<AddMaterials />} />
            </Routes>
          </div>
        </SalesContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
