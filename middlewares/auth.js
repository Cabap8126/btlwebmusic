const jwt = require("../helpers/jwt")
const User = require("../model/user")
module.exports.auth = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const idUser = jwt.vetifyTk(req.cookies.tokenUser).userId
        const user = await User.findOne({
            _id: idUser
        }).select("-password")
        if (!user) {
            return res.redirect("/auth/login")
        }
        res.locals.user = user
        return next()
    }
    next()
}