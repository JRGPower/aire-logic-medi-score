const express = require("express");
const mongoose = require("mongoose");
const Record = require("./models/record");

const patientsRoutes = require("./routes/patientsRoutes");
const newRecordRoutes = require("./routes/new-recordRoutes");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

// Connect to MongoDB
const containerName = "mongodb";
const dbName = "testdb";
const uri = `mongodb://${containerName}:27017/${dbName}`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB =)");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(3000);
console.log("listening on port:3000");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: "true" }));

// CSS file serve Route
app.get("/css/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(__dirname + `/css/${filename}`);
});

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/patients", patientsRoutes);
app.use("/new-record", newRecordRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
