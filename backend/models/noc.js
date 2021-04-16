const mongoose = require("mongoose");

const NOCSchema = mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String, required: true },
  surname: { type: String, required: true },
  mobile: { type: String, required: true },
  anumber: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  pstation: { type: String, required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  pnumber: { type: String, required: true },
  pidate: { type: String, required: true },
  pedate: { type: String, required: true },
  adprof: { type: String, required: true },
  pov: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("NOC", NOCSchema);
