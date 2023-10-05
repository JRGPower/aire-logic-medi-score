const Record = require("../models/record");
const recordService = require("../services/recordService");

const renderNewRecordForm = async (req, res) => {
  try {
    const distinctPatientIds = await recordService.findDistinctPatientIds();
    const currentDateTime = new Date().toISOString().slice(0, 16);

    res.render("new-record", {
      title: "New Record",
      patients: distinctPatientIds,
      id: "",
      currentDateTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

const renderNewRecordFormID = (req, res) => {
  const id = req.params.id;
  const currentDateTime = new Date().toISOString().slice(0, 16);

  res.render("new-record", {
    title: "new record",
    patients: [],
    id,
    currentDateTime,
  });
};

const postNewRecord = async (req, res) => {
  try {
    const result = await recordService.createRecord(req.body);
    res.redirect(`/patients/${result.patientId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

module.exports = { renderNewRecordForm, renderNewRecordFormID, postNewRecord };
