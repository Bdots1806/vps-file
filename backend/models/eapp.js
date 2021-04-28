const mongoose = require("mongoose");

const EASchema = mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  hnumber: { type: String, required: true },
  soc: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  apincode: { type: String, required: true },
  type: { type: String, required: true },
  district: { type: String, required: true },
  pstation: { type: String, required: true },
  dfrom: { type: String, required: true },
  tfrom: { type: String, required: true },
  dto: { type: String, required: true },
  tto: { type: String, required: true },
  bdes: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("EA", EASchema);
