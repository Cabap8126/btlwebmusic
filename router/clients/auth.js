const express = require('express');
const router = express();
const controller = require("../../controller/clients/auth")
const middlerRateLimit = require("../../middlewares/rateLimit")
const middler = require("../../middlewares/auth")
router.get("/login",controller.login)
router.post("/login",controller.loginpost)
router.get("/register",controller.register)
router.post("/register",middlerRateLimit.registerLimiter,controller.registerPs)
router.get("/otp",controller.otp)
router.post("/otp",controller.otpPost)
router.get("/forgotPw",controller.forgot)
router.post("/forgotPw",controller.fotgotPs)
router.get("/resetPw",controller.reset)
router.post("/resetPw",controller.resetPw)
router.get("/logout",controller.logout)
module.exports = router