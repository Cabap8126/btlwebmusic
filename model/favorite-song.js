const mongoose = require("mongoose");
const favorite = new mongoose.Schema({
    user_id : String,
    songId : String,
    deleted : {
        type : Boolean,
        default : false
    },
    deletedAt : Date,

},{
    timestamps : true
})
const FavoriteSong = mongoose.model("FavoriteSong",favorite,"favorite-Song");
module.exports = FavoriteSong;