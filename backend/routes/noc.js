const express = require("express");
const multer = require("multer");

const NOC = require("../models/noc");
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
    const app = new NOC({
      fname: req.body.fname,
      mname: req.body.mname,
      surname: req.body.surname,
      address: req.body.address,
      pincode: req.body.pincode,
      mobile: req.body.mobile,
      email: req.body.email,
      nadate: req.body.nadate,
      ponoc: req.body.ponoc,
      nocf: req.body.nocf,
      district: req.body.district,
      pstation: req.body.pstation,
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
    const app = new NOC({
      _id: req.body.id,
      fname: req.body.fname,
      mname: req.body.mname,
      surname: req.body.surname,
      address: req.body.address,
      pincode: req.body.pincode,
      mobile: req.body.mobile,
      email: req.body.email,
      nadate: req.body.nadate,
      ponoc: req.body.ponoc,
      nocf: req.body.nocf,
      district: req.body.district,
      pstation: req.body.pstation,
      imagePath: imagePath,
      creator: req.userData.userId
    });
    console.log(app);
    Post.updateOne({ _id: req.params.id }, post).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  NOC.find()
  .then(documents => {
      res.status(200).json({
        message: "Post Fetched",
        apps: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  NOC.findById(req.params.id).then(app => {
    if (app) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", //checkAuth,
(req, res, next) => {
  NOC.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
