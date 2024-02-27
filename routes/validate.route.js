const express = require("express");
const router = express.Router();
const verifyController = require("../controller/verifyAdhaar");
const StatusController = require("../controller/getStatus");

router.post("/verifyAdhaar", verifyController.verifyAdhaar);

router.get("/getStatus/:id", StatusController.getStatus);

module.exports = router;
