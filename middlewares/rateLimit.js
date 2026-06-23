const rateLimit = require('express-rate-limit');

module.exports.registerLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5, 
    message: "Gửi quá nhiều lần",
    standardHeaders: 'draft-7', 
    legacyHeaders: false,
    ipv6Subnet : 64
});