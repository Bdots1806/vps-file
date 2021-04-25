const mongoose = require("mongoose");

const ChallanSchema = mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  vnumber: { type: String, required: true },
  cdate: { type: String, required: true },
  cdes: { type: String, required: true },
  amount: { type: String, required: true },
  district: { type: String, required: true },
  pstation: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Challan", ChallanSchema);
