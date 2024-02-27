const express = require("express");
const router = express.Router();
const controller = require("../controller/verifyAdhaar");

router.post("/verifyAdhaar", controller.verifyAdhaar);

module.exports = router;
