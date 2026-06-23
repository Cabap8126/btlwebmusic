const express = require('express');
const router = express();
const controller = require("../../controller/clients/auth")
const middlerRateLimit = require("../../middlewares/rateLimit")
router.get("/login",controller.login)
router.post("/login",controller.loginpost)
router.get("/register",controller.register)
router.post("/register",middlerRateLimit.registerLimiter,controller.registerPs)
router.get("/otp",controller.otp)
router.post("/otp",controller.otpPost)
module.exports = router