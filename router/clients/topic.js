const express = require('express');
const router = express();
const controller = require("../../controller/clients/topic")
router.get("/create",controller.create)
router.get("/read",controller.read)
router.put("/update/:id",controller.update)
router.delete("/delete/:id",controller.delete)
module.exports = router