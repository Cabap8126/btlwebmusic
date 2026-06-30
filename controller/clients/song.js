const { vetifyTk } = require("../../helpers/jwt");
const FavoriteSong = require("../../model/favorite-song");
const Song = require("../../model/song");
module.exports.index = async (req, res) => {
    const idsong = req.params.id;
    const idUs = vetifyTk(req.cookies.tokenUser).userId;
    const song = await Song.findOne({
        _id: idsong,
        deleted: false
    }).lean();
    if (!song) {
        return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    if (idUs) {
        const fvr_atv = await FavoriteSong.findOne({
            user_id: idUs,
            songId: idsong,
            deleted: false
        });
        if (fvr_atv) {
            song.status = true;
        } else {
            song.status = false;
        }
    } else {
        song.status = false;
    }
    return res.json(song)
}