const express = require("express");
const spareController = require("../controllers/sparePartsController");
const { protect } = require("../controllers/authcontroller");

const router = express.Router();

router.use(protect);
router.post("/", spareController.createSpare);
router.get("/", spareController.getSpares);
router.get("/:id", spareController.getSpareById);
router.put("/:id", spareController.updateSpare);
router.delete("/:id", spareController.deleteSpare);

module.exports = router;
