const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    patientId: { type: String, required: true },
    observation: {
      oxygen: { type: Boolean },
      cvpu: { type: Boolean },
      respirationRate: { type: Number },
      spO2: { type: Number },
      temperature: { type: Number },
      cbg: { value: { type: Number }, fasting: { type: Boolean } },
      time: { type: Date },
      comments: { type: String },
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
