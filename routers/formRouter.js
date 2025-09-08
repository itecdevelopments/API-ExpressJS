const express = require("express");
const router = express.Router();
const serviceReportService = require("../services/FormService.js");
const authorizeRoles = require("../middleware/rolebased.js");
const { restrictTo } = require("../controllers/authcontroller.js");
router.get("/", (req, res) => {
  res.send("Testing");
});
/* --------------------------- Create Service Form -------------------------- */
router.post(
  "/report",
  authorizeRoles("CM", "BM", "ENG"),
  serviceReportService.createServiceReport
);
/* -------------------------- Get Services Reports -------------------------- */
router.get(
  "/reports",
  authorizeRoles(),
  serviceReportService.getAllServiceReports
);
/* ------------------------ Get Service Report By ID ------------------------ */
router.get("/report/:id", serviceReportService.getReport);

module.exports = router;
