import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard.jsx";
// import MyProfile from "./pages/MyProfile.jsx";
// import Products from "./pages/Products.jsx";
// import Materials from "./pages/Materials.jsx";
// import Analytics from "./pages/Analytics.jsx";
// import Production from "./pages/Production.jsx";

//pages and components of exports
import ExportsDashboard from "./pages/ExportsDashboard.jsx"
import ExportsNavBar from "./components/ExportsNavBar.jsx"
import ExportsProfile from "./pages/ExportsProfile.jsx";
import ExportOrderDetails from "./pages/ExportOrderDetails.jsx";
import ExportOrders from "./pages/ExportOrders.jsx";
import Importer from "./pages/Importer.jsx";
import ExportAnalytics from "./pages/ExportAnalytics.jsx";


// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/Dashboard" element={<Dashboard />} />
//           <Route path="/Products" element={<Products />} />
//           <Route path="/Materials" element={<Materials />} />
//           <Route path="/Production" element={<Production />} />
//           <Route path="/Analytics" element={<Analytics />} />
//           <Route path="/MyProfile" element={<MyProfile />} />
//         </Routes>
//       </Navbar>
//     </BrowserRouter>
//   );
// };

function App(){
  return (
    <BrowserRouter>
       <ExportsNavBar>
         <Routes>
         <Route path="/" element={<ExportsDashboard />} />
         <Route path="/ExportsDashboard" element={<ExportsDashboard />} />
         <Route path="/Importer" element={<Importer />} />
         <Route path="/ExportOrders" element={<ExportOrders />} />
         <Route path="/ExportOrderDetails" element={<ExportOrderDetails />} />
         <Route path="/ExportAnalytics" element={<ExportAnalytics />} />
         <Route path="/ExportsProfile" element={<ExportsProfile />} />
         </Routes>
       </ExportsNavBar>
     </BrowserRouter>
  );
};

export default App;
