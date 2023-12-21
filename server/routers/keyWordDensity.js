const express = require("express");
const router = express.Router();

const { getDensity } = require("../controllers/keyWordDensity.js");

router.post("/keyword",getDensity);

module.exports = router;