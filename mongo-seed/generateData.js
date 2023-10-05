const fsPromises = require("fs").promises;

// Write data to JSON file
async function writeJSONFile(filename, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);

    await fsPromises.writeFile(filename, jsonData);

    console.log("Data written to the JSON file successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

// generate an array of records based on passed (config) structre - see examples >>>
const generateRecords = (configurations) => {
  //Set required config fields array
  const requiredFields = [
    "oxygen",
    "cvpu",
    "respirationRateRange",
    "spO2Range",
    "temperatureRange",
    "cbgRange",
    "cbgBool",
    "quantity",
    "patientId",
  ];
  //Check first config object had all require fields before executing
  if (requiredFields.some((field) => !configurations[0][field])) {
    throw new Error("Initial configuration must have all required fields.");
  }

  const totalQuantity = configurations.reduce((acc, curr) => {
    return (acc += curr.quantity);
  }, 0);
  const date = new Date();
  const records = [];
  let previousConfig = null; // Set initally to null

  //Merge values from the previous config if they are missing in the current config
  for (const config of configurations) {
    if (previousConfig) {
      for (const key of Object.keys(previousConfig)) {
        if (!config.hasOwnProperty(key)) {
          config[key] = previousConfig[key];
        }
      }
    }

    const {
      oxygen,
      cvpu,
      respirationRateRange,
      spO2Range,
      temperatureRange,
      cbgRange,
      cbgBool,
      quantity,
      patientId,
    } = config;

    //Randomise values in the  range from config
    for (let i = 0; i < quantity; i++) {
      const record = {
        patientId: patientId,
        observation: {
          oxygen: randomFrom(oxygen),
          cvpu: randomFrom(cvpu),
          respirationRate: randomInRange(respirationRateRange),
          spO2: randomInRange(spO2Range),
          temperature: randomInRange(temperatureRange, 1),
          cbg: { value: randomInRange(cbgRange), fasting: randomFrom(cbgBool) },
          time: generateDate(date, totalQuantity - records.length),
          comments: "",
        },
      };

      records.push(record);
    }

    //Store the current config
    previousConfig = config;
  }

  return records;
};

//Randomise Functions
function randomInRange([min, max], decimals = 0) {
  if (!min || !max) {
    return null;
  }
  const random = Math.random();
  const range = max - min;
  const result = min + random * range;
  return parseFloat(result.toFixed(decimals));
}

function randomFrom(values) {
  if (!values.length) return null;
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

function generateDate(initialDate, index) {
  const initialTime = initialDate.getTime();

  // Create random offset +/-15 minutes in ms
  const randomOffset = (Math.random() * 30 - 15) * 60 * 1000;

  // Create a new date - 4 hours, - an offset in ms
  const newDate = new Date(
    initialTime - index * 4 * 60 * 60 * 1000 - randomOffset
  );

  return newDate;
}

/* Observation records will be genereted with timestamps every 4 hours +/- 15 mins, 
stepping backwards from current time*/

/*Number of Observations to be generated is passed as a property in each config onbject: 

{   oxygen: [false, true],
    cvpu: [false, true],
    respirationRateRange: [min, max],
    spO2Range: [min, max],
    temperatureRange: [min, max],
    cbgRange: [min, max],
    cbgBool: [false, true],
    quantity: 12,
    patientId: "001",
  }

Function can passed an array of configs, each with a quantity, 
to enable simulating changing conditions of a patient
*/

/*
If arguments are missing from a config, the values from the previous config are used
*/

/*Input examples for generating data */

//Random data covering full possible range from medi-score table, 10 records
const fullRangeRandom = {
  airOxygenRange: [true, false],
  conciousnessRange: [true, false],
  respirationRateRange: [5, 30],
  spO2Range: [70, 100],
  temperatureRange: [34, 40],
  cbgRange: [2, 10],
  cbgBool: [true, false],
  quantity: 10,
  patientId: "001",
};

//All observations within normal healthy range, scoring 0, for 2 days of monitoring
const patient001 = generateRecords([
  {
    oxygen: [false],
    cvpu: [false],
    respirationRateRange: [12, 20],
    spO2Range: [95, 100],
    temperatureRange: [36.1, 38],
    cbgRange: [5.9, 7.8],
    cbgBool: [false],
    quantity: 12,
    patientId: "001",
  },
]);

/* Patient exhibiting raised respirationrate, followed by a raised temperature, 
then intermittent cvpu */
const patient002 = generateRecords([
  {
    oxygen: [false],
    cvpu: [false],
    respirationRateRange: [20, 30],
    spO2Range: [88, 93],
    temperatureRange: [36.1, 38],
    cbgRange: [],
    cbgBool: [],
    quantity: 12,
    patientId: "002",
  },
  { temperatureRange: [37.9, 39], quantity: 3 },
  { cvpu: [true, true, true, false], quantity: 3 },
]);

/* Patient exhibiting dropping SpO2 over a few days before being given oxygen*/
const patient003 = generateRecords([
  {
    oxygen: [false],
    cvpu: [false],
    respirationRateRange: [9, 12],
    spO2Range: [90, 95],
    temperatureRange: [36.1, 38],
    cbgRange: [],
    cbgBool: [],
    quantity: 2,
    patientId: "003",
  },
  {
    spO2Range: [89, 91],
    quantity: 3,
  },
  {
    spO2Range: [84, 90],
    quantity: 3,
  },
  {
    oxygen: [true],
    spO2Range: [84, 9],
    quantity: 1,
  },
  {
    spO2Range: [88, 95],
    quantity: 5,
  },
]);

/* Patient exhibits high temperature and confusion that gets better*/
const patient004 = generateRecords([
  {
    oxygen: [false],
    cvpu: [true],
    respirationRateRange: [14, 16],
    spO2Range: [93, 97],
    temperatureRange: [38.8, 39.3],
    cbgRange: [],
    cbgBool: [],
    quantity: 4,
    patientId: "004",
  },
  {
    quantity: 2,
    temperatureRange: [38.3, 39],
  },
  {
    quantity: 2,
    temperatureRange: [38, 38.5],
  },
  {
    quantity: 2,
    cvpu: [false],
    temperatureRange: [38, 38.5],
  },
  {
    quantity: 4,
    cvpu: [false],
    temperatureRange: [37, 37.5],
  },
]);

writeJSONFile("./mongo-seed/seed-data.json", [...patient001, ...patient002, ...patient003, ...patient004]);
