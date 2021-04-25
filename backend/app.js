const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const policeverRouter = require("./routes/policever");
const userRoutes = require("./routes/user");
const puserRoutes = require("./routes/puser");
const challanRoutes = require("./routes/challan");

const app = express();

mongoose
  .connect(
    "mongodb+srv://bdots:lLate8J5C2RPcYxq@cluster0.dxqss.mongodb.net/Police"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/policever", policeverRouter);
app.use("/api/challan", challanRoutes);
app.use("/api/user", userRoutes);
app.use("/api/puser", puserRoutes);

module.exports = app;
