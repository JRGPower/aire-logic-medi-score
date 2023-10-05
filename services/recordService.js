const Record = require("../models/record");

async function findDistinctPatientIds() {
  try {
    const distinctPatientIds = await Record.distinct("patientId");
    return distinctPatientIds;
  } catch (error) {
    throw error;
  }
}

async function findMostRecentPatientRecord(patientId) {
  try {
    const mostRecentRecord = await Record.findOne({ patientId }).sort({
      "observation.time": -1,
      createdAt: -1,
    });

    return mostRecentRecord;
  } catch (error) {
    throw error;
  }
}

async function findPatientRecordsByQuantity(patientId, quantity = 10) {
  try {
    const records = await Record.find({ patientId })
      .sort({ "observation.time": -1, createdAt: -1 })
      .limit(quantity);
    return records;
  } catch (error) {
    throw error;
  }
}

async function findPatientRecordsByTime(patientId, hours = 24) {
  try {
    // Calculate the date 24 hours ago from the current time
    const prevDateTime = new Date(Date.now() - hours * 60 * 60 * 1000);

    const records = await Record.find({
      patientId,
      $expr: {
        $gte: [
          {
            // Convert observation.time string to Date
            $toDate: "$observation.time",
          },
          prevDateTime,
        ],
      },
    }).sort({ "observation.time": -1, createdAt: -1 });

    return records;
  } catch (error) {
    throw error;
  }
}

async function createRecord(data) {

  // Convert form data correct data types to match Record model
  const oxygenBool = data.observation.oxygen === "true";
  const cvpuBool = data.observation.cvpu === "true";
  const fastingBool = data.observation.cbg.fasting === "true";
  const newTime = new Date(data.observation.time);

  data.observation.oxygen = oxygenBool;
  data.observation.cvpu = cvpuBool;
  data.observation.cbg.fasting = fastingBool;
  data.observation.time = newTime;

  try {
    const record = new Record(data);
    const result = await record.save();
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findDistinctPatientIds,
  findMostRecentPatientRecord,
  findPatientRecordsByQuantity,
  findPatientRecordsByTime,
  createRecord,
};
