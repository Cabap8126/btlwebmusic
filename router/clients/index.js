const homeRouter = require("./home")
const auth = require("./auth")
module.exports = ( app ) => {
    app.use("/",homeRouter)
    app.use("/auth",auth)
}