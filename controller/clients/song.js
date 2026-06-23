const Song = require("../../model/song");
module.exports.index = async (req, res) => {
    const idsong = req.params.id
    const song = await Song.findOne({
        _id : idsong,
        deleted : false
    });
    res.json(song)
}