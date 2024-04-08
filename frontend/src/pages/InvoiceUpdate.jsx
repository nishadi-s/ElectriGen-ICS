import React from "react";
import EditInvoice from "../components/EditInvoice";

const InvoiceUpdate = () => {
  return (
    <div>
      <h1>Update Invoice</h1>

      <div>
      <EditInvoice match={{ params: { billID: 'yourBillID' } }} />
      </div>
    </div>
  );
};

export default InvoiceUpdate;