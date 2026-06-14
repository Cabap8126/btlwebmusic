const songRouter = require("./song")
const singerRouter = require("./singer")
module.exports = ( app ) => {
    app.use("/",songRouter)
    app.use("/clients/singer", singerRouter)
}
