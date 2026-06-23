const express = require('express');
const router = express();
const controller = require("../../controller/clients/home")
const topics = require("./topic")
const song = require("./song")
router.get("/",controller.index)
router.use("/topic",topics)
router.use("/song",song)
// router.use("/singer",require("./singer"))
// router.use("/song",require("./song"))
module.exports = router