const recordService = require("../services/recordService");
const { formatDateTime } = require("../utils");
const { mediScoreAlertCheck } = require("../utils/alert-check");
const {
  calculateMediScore,
  calculateMediScoreAvg,
} = require("../utils/medi-score-calc");

//Big function, could do with a refactor
async function renderPatientsList(req, res) {
  try {
    // Get list of patient all IDs
    const distinctPatientIds = await recordService.findDistinctPatientIds();

    // Get latest record for each patient
    const latestPatientRecords = await Promise.all(
      distinctPatientIds.map((patientId) =>
        recordService.findMostRecentPatientRecord(patientId)
      )
    );
    // Get last 24 hours of records for each patient
    const last24HourRecords = await Promise.all(
      distinctPatientIds.map((patientId) =>
        recordService.findPatientRecordsByTime(patientId)
      )
    );

    /* Calculate MediSCore, Average MediScore, format DateTime 
      and add to each record as new properties*/
    latestPatientRecords.forEach((record, index) => {
      record.formattedDateTime = formatDateTime(record.observation.time);
      record.mediScore = calculateMediScore(record.observation);
      record.mediScoreAvg = calculateMediScoreAvg(last24HourRecords[index]);
      const alert = mediScoreAlertCheck(record);

      record.scoreAlertClass = alert.scoreAlertClass;
      record.avgAlertClass = alert.avgAlertClass;
    });

    // Render Page and pass queried and converted data to html template
    res.render("patients", {
      title: "Patients List",
      patients: latestPatientRecords,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
}

async function renderPatientDetails(req, res) {
  const id = req.params.id;
  try {
    //Get latest 10 records for patient
    const records = await recordService.findPatientRecordsByQuantity(id, 10);

    /* Calculate MediSCore, format DateTime, 
    and add to each record as new properties*/
    records.forEach((record) => {
      record.formattedDateTime = formatDateTime(record.observation.time);
      record.mediScore = calculateMediScore(record.observation);
    });
    res.render("patient-details", {
      title: "patient-details",
      records,
      id,
      recordIndex: 10,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
}

module.exports = { renderPatientsList, renderPatientDetails };
