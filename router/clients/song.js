const express = require('express');
const router = express();
const controller = require("../../controller/clients/song")
router.get("/",controller.read)
router.post("/",controller.create)
router.put("/:id",controller.update)
router.delete("/:id",controller.delete)
module.exports = router