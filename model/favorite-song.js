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
const FavoriteSong = mongoose.model("favorite-song",favorite,"favorite-song");
module.exports = FavoriteSong;