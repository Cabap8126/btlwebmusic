const express = require('express');
const router = express();
const controller = require("../../controller/clients/topic")
router.get("/:id",controller.index)
module.exports = router