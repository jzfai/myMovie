const express = require("express");
const pool = require("../pool");
let router = express.Router();
const data=require('../data');

//movie
router.get('/xMovie',data.xMovie);
router.get('/aMovie',data.aMovie);
router.get('/dMovie',data.dMovie);
router.get('/kMovie',data.kMovie);


module.exports = router;