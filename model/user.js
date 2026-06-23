const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    expireAt:{
        type : Date,
        default : Date.now(),
        index: {expires : '5m'}
    }
    ,
    role: String,
    tokenUser: {
        type: String,
        default: ""
    },
    history: [
        {
            songId: String,
            name: String,
            listenedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    uploadSong: [
        {
            songId: String,
            name: String,
        }
    ],
}, {
    timestamps: true,
});

const User = mongoose.model("user", userSchema, "user");
module.exports = User;