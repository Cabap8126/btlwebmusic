const express = require('express');
const router = express();
const controller = require("../../controller/clients/home")
const topics = require("./topic")
const song = require("./song")
const middler = require("../../middlewares/auth")
router.get("/",middler.auth,controller.index)
router.get("/detail",middler.auth,controller.detail)
router.get("/favorite",middler.auth,controller.favorite)
router.post("/favorite/:idSog",middler.auth,controller.favoritePs)
router.use("/topic",middler.auth,topics)
router.use("/song",song)
// router.use("/singer",require("./singer"))
// router.use("/song",require("./song"))
module.exports = router