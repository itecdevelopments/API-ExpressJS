const Spare = require("../models/sparePartsModel");
const factory = require("./handlerFactory");

const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

// Create a new spare
const createSpare = factory.createOne(Spare);

// Get all spares
const getSpares = factory.getAll(Spare);
// async (req, res) => {
//   const spares = await Spare.find();
//   res.status(200).json(spares);
// };

// Get a single spare by ID
const getSpareById = factory.getOne(Spare);

// Update a spare
const updateSpare = factory.updateOne(Spare);

// Delete a spare
const deleteSpare = factory.deleteOne(Spare);

module.exports = {
  createSpare,
  getSpares,
  getSpareById,
  updateSpare,
  deleteSpare,
};
