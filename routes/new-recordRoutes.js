const express = require("express");
const router = express.Router();
const {
  renderNewRecordForm,
  renderNewRecordFormID,
  postNewRecord,
} = require("../controllers/new-recordController");

router.get("/", renderNewRecordForm);

router.get("/:id", renderNewRecordFormID);

router.post("/", postNewRecord);

module.exports = router;
