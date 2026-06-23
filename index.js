const express = require("express")
const  methodOverride = require("method-override") 
const dotenv = require("dotenv")
const database = require("./config/connectdata")
const routerClients = require("./router/clients/index")
const bodyParser = require('body-parser'); 
const cookieParser = require("cookie-parser");
const session = require("express-session") 
const flash = require('express-flash')
dotenv.config()
database.connect()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser('abcxyz'));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 60000
    }}));
app.use(bodyParser.urlencoded({extended : false}))
app.use(flash());
app.set("views",`${__dirname}/views`);
app.set("view engine","pug")
app.use(express.json());
routerClients(app)
app.listen(port , ()=>{
    console.log(`app listen on port ${port}`)
})
