const Customer = require("../models/customerModel");
const Region = require("../models/regionModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// Create Customer
const createCustomer = factory.createOne(Customer);
// Create Region
const getRegion = factory.getAll(Region);
const createRegion = factory.createOne(Region);
// Get all customers
// Get all customers
const getCustomers = factory.getAll(Customer, "region");
// const getCustomers = catchAsync(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const customers = await Customer.find()
//     .populate("region")
//     .skip(skip)
//     .limit(limit);
//   const totalCustomers = await Customer.countDocuments();
//   const testMap = customers.map((cust) => {
//     return {
//       id: cust._id.toString(),
//       name: cust.name.toUpperCase(),
//       code: cust.code,
//       region: cust.region ? cust.region.name : "Unknown", // Handle null regions
//     };
//   });

//   res.json({
//     page,
//     limit,
//     totalCustomers,
//     totalPages: Math.ceil(totalCustomers / limit),
//     data: customers,
//   });
// });
// Get a single customer by ID
const getCustomerById = factory.getOne(Customer, "region");
// Update a customer
const updateCustomer = factory.updateOne(Customer);
// Delete a customer
const deleteCustomer = factory.deleteOne(Customer);

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  createRegion,
  getRegion,
};
