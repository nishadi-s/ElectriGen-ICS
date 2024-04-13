import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationNavbar from "./components/DonationNavbar.jsx";
import Donation_Dashboard from "./pages/Donation_Dashboard.jsx";
import New_Projects from "./pages/New_Projects.jsx";
import Doner_Feedback from "./pages/Doner_Feedback.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Doner_Analystics from "./pages/Doner_Analytics.jsx";
import Logout from "./pages/Logout.jsx";
import DFeedbackFetch from "./components/dFeedbackFetch.jsx";

import DProjectDetails from "./components/DProjectDetails.jsx";




const App = () => {
  return (
    <BrowserRouter>
      <DonationNavbar>
        <Routes>
          <Route path="/" element={<Donation_Dashboard />} />
          <Route path="/Dashboard" element={<Donation_Dashboard />} />
          <Route path="/New_Projects" element={<New_Projects />} />
          <Route path="/Doner_Feedback" element={<Doner_Feedback />} />
          <Route path="/Doner_Analytics" element={<Doner_Analystics />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/DFeedbackFetch" element={<DFeedbackFetch />} />
          
          <Route path="/DProjectDetails" element={<DProjectDetails />} />
          


        </Routes>
      </DonationNavbar>
    </BrowserRouter>
  );
};

export default App;
