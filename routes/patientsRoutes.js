const express = require("express");
const router = express.Router();
const {
  renderPatientsList,
  renderPatientDetails,
} = require("../controllers/patientsController");

router.get("/", renderPatientsList);

router.get("/:id", renderPatientDetails);

module.exports = router;
