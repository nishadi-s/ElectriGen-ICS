const router = require("express").Router();
let showroom = require("../models/salesModel");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

router.post(
  "/add",
  authMiddleware([USER_ROLES.SHOWROOM_AND_SALES_MANAGER]),
  async (req, res) => {
    try {
      const { billID, bdate, items } = req.body;

      // Calculate total amount
      let totalAmount = 0;
      let totalQty = 0; // Correct variable name for total quantity

      items.forEach((item) => {
        totalAmount += item.qty * item.price;
        totalQty += item.qty; // Increment totalQty
      });

      // Validate and convert bdate to Date object (assuming valid date format)
      const convertedBdate = new Date(bdate);

      // Create a new sales invoice object using the Mongoose model
      const newSale = new showroom({
        billID: Number(billID), // Ensure billID is converted to a number
        bdate: convertedBdate,
        items,
        tot: totalAmount, // Use the calculated total amount
        totqty: totalQty, // Corrected variable name for total quantity
      });

      // Save the new sales invoice to the database
      await newSale.save();

      res.status(201).send({ message: "Sales invoice added successfully" });
    } catch (error) {
      console.error("Error adding sales invoice:", error);
      res.status(500).send({ error: "Server error" });
    }
  }
);

router.get("/display", async (req, res) => {
  try {
    // Use find to get all sales invoices from the database
    const allInvoices = await showroom.find();

    res.status(200).send({ status: "All invoices fetched", data: allInvoices });
  } catch (error) {
    console.error("Error fetching all invoices:", error);
    res.status(500).send({ error: "Server error" });
  }
});

//update
router.put(
  "/update/:billID",
  authMiddleware([USER_ROLES.SHOWROOM_AND_SALES_MANAGER]),
  async (req, res) => {
    try {
      const { billID } = req.params;
      const { bdate, items } = req.body;

      // Calculate total amount based on updated items
      let totalAmount = 0;
      items.forEach((item) => {
        totalAmount += item.qty * item.price;
      });

      // Create an object with the updated data and calculated total amount
      const updatedSales = {
        bdate,
        items,
        tot: totalAmount,
      };

      // Use findOneAndUpdate to find and update the document based on billID
      const updatedInvoice = await showroom.findOneAndUpdate(
        { billID: billID }, // Find by billID
        updatedSales, // Update with new data
        { new: true } // Return the updated document
      );

      if (updatedInvoice) {
        res
          .status(200)
          .send({ status: "Invoice updated", data: updatedInvoice });
      } else {
        res.status(404).send({ error: "Invoice not found" });
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).send({ error: "Server error" });
    }
  }
);

//delete

router.delete(
  "/delete/:billID",
  authMiddleware([USER_ROLES.SHOWROOM_AND_SALES_MANAGER]),
  async (req, res) => {
    try {
      const { billID } = req.params;
      console.log("Deleting invoice with billID:", billID);

      // Use findOneAndDelete to find and delete the document based on billID
      const deletedInvoice = await showroom.findOneAndDelete({
        billID: billID,
      });

      if (deletedInvoice) {
        console.log("Invoice deleted:", deletedInvoice);
        res.status(200).send({ status: "Invoice deleted" });
      } else {
        console.log("Invoice not found");
        res.status(404).send({ error: "Invoice not found" });
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).send({ error: "Server error" });
    }
  }
);

//get by bill id
router.get(
  "/get/:billID",
  authMiddleware([USER_ROLES.SHOWROOM_AND_SALES_MANAGER]),
  async (req, res) => {
    try {
      const { billID } = req.params;

      // Use findOne to find the document based on billID
      const invoice = await showroom.findOne({ billID: billID });

      if (invoice) {
        res.status(200).send({ status: "Invoice fetched", data: invoice });
      } else {
        res.status(404).send({ error: "Invoice not found" });
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).send({ error: "Server error" });
    }
  }
);

module.exports = router;
