const express = require("express");
const multer = require("multer");

const PV = require("../models/policever");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/pdf": "pdf"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const app = new PV({
      fname: req.body.fname,
      mname: req.body.mname,
      surname: req.body.surname,
      mobile: req.body.mobile,
      anumber: req.body.anumber,
      email: req.body.email,
      country: req.body.country,
      state: req.body.state,
      district: req.body.district,
      pstation: req.body.pstation,
      address: req.body.address,
      occupation: req.body.occupation,
      city: req.body.city,
      pincode: req.body.pincode,
      pnumber: req.body.pnumber,
      pidate: req.body.pidate,
      pedate: req.body.pedate,
      adprof: req.body.adprof,
      pov: req.body.pov,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId
    });
    app.save().then(createdApp => {
      res.status(201).json({
        message: "App added successfully",
        app: {
          ...createdApp,
          id: createdApp._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const app = new PV({
      _id: req.body.id,
      fname: req.body.fname,
      mname: req.body.mname,
      surname: req.body.surname,
      mobile: req.body.mobile,
      anumber: req.body.anumber,
      email: req.body.email,
      country: req.body.country,
      state: req.body.state,
      district: req.body.district,
      pstation: req.body.pstation,
      address: req.body.address,
      occupation: req.body.occupation,
      city: req.body.city,
      pincode: req.body.pincode,
      pnumber: req.body.pnumber,
      pidate: req.body.pidate,
      pedate: req.body.pedate,
      adprof: req.body.adprof,
      pov: req.body.pov,
      imagePath: imagePath,
      creator: req.userData.userId
    });
    PV.updateOne({ _id: req.params.id, creator: req.userData.userId }, app).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    });
  }
);

router.get("", (req, res, next) => {
  PV.find()
  .then(documents => {
      res.status(200).json({
        message: "Post Fetched",
        apps: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(app => {
    if (app) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", checkAuth,
(req, res, next) => {
  PV.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
