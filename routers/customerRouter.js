const express = require("express");
const customerController = require("../controllers/customerController");
const { protect } = require("../controllers/authcontroller");
const router = express.Router();
router.use(protect);
// {URL}/customers
// Require Log in
// ___________________________________________________________________
// Get Customers
router.get("/", customerController.getCustomers);
// Get Customer By ID
router.get("/:id", customerController.getCustomerById);
// Create Customer
router.post("/", customerController.createCustomer);
// Update Customer
router.put("/:id", customerController.updateCustomer);
//  Delete Customer
router.delete("/:id", customerController.deleteCustomer);
// Create Region
router.post("/createRegion", customerController.createRegion);
// Get Regions
router.get("/region", customerController.getRegion);

module.exports = router;
