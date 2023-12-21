const express = require("express");
const router = express.Router();

const { getHtmlFile, parseHtmlFile } = require("../controllers/parse.js");

router.post("/", getHtmlFile, parseHtmlFile);

module.exports = router;