// ToDO / WIP

const fs = require("fs");
const Record = require("../models/record");
const mongoose = require("mongoose");
require("dotenv").config();

const reSeedDB = process.env.RE_SEED_DB;

async function addRecords() {
  try {
    // Read the JSON seed-data
    const jsonData = fs.readFileSync("seed-data.json", "utf8");
    const data = JSON.parse(jsonData);

    // Convert time strings to Date objects
    const preprocessedData = data.map((record) => {
      record.observation.time = new Date(record.observation.time);
      return record;
    });

    // Insert records
    await Record.insertMany(preprocessedData);
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

async function main() {
  try {
    // Connect to MongoDB
    const containerName = "mongodb";
    const dbName = "testdb";
    const uri = `mongodb://${containerName}:27017/${dbName}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB =)");

    if (reSeedDB) {
      // Clear database
      await mongoose.connection.dropDatabase();
      console.log("Database cleared.");
      await addRecords();
    } else {
      // Check if the Records collection exists
      const collections = await mongoose.connection.db
        .listCollections({ name: "records" })
        .toArray();
      if (collections.length > 0) {
        console.log(
          "Collection 'records' already exists. Skip adding records."
        );
        // Close the database connection
        mongoose.disconnect();
      } else {
        await addRecords();
        mongoose.disconnect();
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
