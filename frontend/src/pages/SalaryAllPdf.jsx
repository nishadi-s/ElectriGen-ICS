import React from 'react';
import AllSalariesReport from '../components/SalaryAllReport'; // Import the AllSalariesReport component
import Navbar_Pay from '../components/Navbar-uvi';

const AllReport = () => {
  return (
    <Navbar_Pay>
    <div>
      {/* Other components or layout elements */}
      <AllSalariesReport />
      {/* Other components or layout elements */}
    </div>
    </Navbar_Pay>
  );
};

export default AllReport;