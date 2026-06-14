const mongoose = require("mongoose");
const singleModel = new mongoose.Schema({
    fullName : String,
    avatar : String,
    status : String,
    slug : String,
    deleted : {
        type : Boolean,
        default : false
    },
    deletedAt : Date,
},{
    timestamps : true
})
const Singer = mongoose.model("Singer",singleModel,"singers");
module.exports = Singer;