const homeRouter = require("./home")
const auth = require("./auth")
module.exports = ( app ) => {    
    app.use("/auth",auth)
    app.use("/",homeRouter)
}