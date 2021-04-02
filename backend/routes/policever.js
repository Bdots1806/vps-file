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
  // checkAuth,
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
      imagePath: url + "/images/" + req.file.filename
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
  // checkAuth,
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
      imagePath: imagePath
    });
    console.log(app);
    Post.updateOne({ _id: req.params.id }, post).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const appQuery = App.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    appQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  appQuery
    .then(documents => {
      fetchedApps = documents;
      return App.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        apps: fetchedApps,
        maxApps: count
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

router.delete("/:id", //checkAuth,
(req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
