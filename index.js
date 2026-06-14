const express = require("express")
const  methodOverride = require("method-override") 
const dotenv = require("dotenv")
const database = require("./config/connectdata")
const routerClients = require("./router/clients/index")
dotenv.config()
database.connect()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))
app.use(express.static(`${__dirname}/public`))
app.set("views",`${__dirname}/views`);
app.set("view engine","pug")
routerClients(app)
app.listen(port , ()=>{
    console.log(`app listen on port ${port}`)
})
