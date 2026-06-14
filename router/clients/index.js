const songRouter = require("./song")
const singerRouter = require("./singer")
module.exports = ( app ) => {
    app.use("/clients/song", songRouter)
    app.use("/clients/singer", singerRouter)
}