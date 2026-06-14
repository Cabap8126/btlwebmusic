const express = require('express');
const router = express();
const controller = require("../../controller/clients/song")
router.get("/",controller.index)
module.exports = router