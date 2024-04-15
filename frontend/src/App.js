import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar-uvi.jsx';
//import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home-Salary.jsx'

//import Login from './pages/Login.jsx';
//import Signup from './pages/Signup.jsx';

//import ForgotPassword from './components/ForgotPassword.jsx';
//import SalaryDetails from './components/SalaryDetails.jsx';
import UpdateSalaryPage from './components/UpdateSalary.jsx'
import AddSalaryPage from './pages/AddSalary.jsx';
import Logout from './pages/Logout.jsx'
import SalaryDetailsPage from './pages/SalaryDetailsPage.jsx';


function App() {
  //const { user } = useAuthContext();
  
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/updateSalary/:id" element={<UpdateSalaryPage />} />
          <Route path="/add-salary" element={<AddSalaryPage />} />
          <Route path="/salary-details" element={<SalaryDetailsPage />} />
       
          
          <Route path="/Logout" element={<Logout />} />
           {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/salary-details" element={<SalaryDetails />} />
            <Route path="/add-salary" component={<AddSalaryPage/>} />
            
            <Route path="/updateSalary/:id" element={<UpdateSalaryPage />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
            <Route path="/resetPassword/:token" element={<ForgotPassword/>}></Route>
  <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />*/}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

//Senith
/*import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
//import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />

          {/*Senith 
          <Route path="/Products" element={<Products />} />
          <Route path="/Production" element={<Production />} />
          <Route path="/Materials" element={<Materials />} />
          <Route path="/AddProducts" element={<AddProducts />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default App;*/
