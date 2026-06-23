const Song = require("../../model/song");
module.exports.index = async (req, res) => {
    const id = req.params.id
    const songs = await Song.find({
        topicId : id,
        deleted : false
    });
    if(songs){
        res.render("clients/Page/songs/song",{
        songs: songs
        })
    }
    else{
        res.send("hiện tại chưa có data cho topic này")
    }
}
