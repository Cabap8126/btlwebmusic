const songRouter = require("./song")
module.exports = ( app ) => {
    app.use("/",songRouter)
}
