const { default: mongoose } = require("mongoose");
const ServiceReport = require("../models/FormModel.js");
const catchAsync = require("../utils/catchAsync.js");

/* ----------------------------- Create A Report ---------------------------- */
/* ---------------------------- "/report" --------------------------- */
/* --------------------------------- @ Post --------------------------------- */
const createServiceReport = catchAsync(async (req, res) => {
  const report = new ServiceReport(req.body);
  const savedReport = await report.save();
  res.status(201).json("Report Created");
});
/* ----------------------------- GET A Report ---------------------------- */
/* ---------------------------- "/reports" --------------------------- */
/* --------------------------------- @ GET --------------------------------- */
const getAllServiceReports = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const { region, role, id } = req.info;

  let query = role=='VXR'?{} :{
    engineerName: id,
  };

  if (role === "BM") {
    query.region = String(req.info.region);
    delete query.engineerName;
  }
  let reports;

  reports = await ServiceReport.find(query)
    .skip(skip)
    .limit(limit)
    .populate(["Customer", "engineerName", "region"]);
  const totalReports = await ServiceReport.countDocuments(query);

  res.json({
    page,
    limit,
    totalReports,
    totalPages: Math.ceil(totalReports / limit),
    data: reports,
  });
});

/* ----------------------------- GET A Single Report ---------------------------- */
/* ---------------------------- "/report/:id" --------------------------- */
/* --------------------------------- @ GET --------------------------------- */
const getReport = catchAsync(async (req, res) => {
  const report = await ServiceReport.findById(req.params.id);
  res.send(report);
});
// Exports
module.exports = {
  createServiceReport,
  getAllServiceReports,
  getReport,
};
