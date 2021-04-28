const mongoose = require("mongoose");

const NOCSchema = mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  nadate: { type: String, required: true },
  ponoc: { type: String, required: true },
  nocf: { type: String, required: true },
  district: { type: String, required: true },
  pstation: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("NOC", NOCSchema);
