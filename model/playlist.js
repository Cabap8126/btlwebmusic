const mongoose = require('mongoose');
const PlayList = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    avatar: String,
    status: {
        type: String,
        default: "inactive"
    },
    songs: [
        {
            songId: String,
            name : String,
        }
    ]
}, {
    timestamps: true
});
const PlayList = mongoose.model('PlayList', PlayList, 'playlists');
module.exports = PlayList;