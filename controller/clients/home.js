const Topic = require('../../model/topic');
const jwt = require("../../helpers/jwt")
const FavoriteSong = require('../../model/favorite-song');
const Song = require('../../model/song');
const Singer = require('../../model/single');
module.exports.index = async (req, res) => {
    const topics = await Topic.find({
        deleted : false
    });
    res.render("clients/Page/main/home",{
        topics: topics
    })
}
module.exports.detail = async ( req,res)=>{
    res.render("clients/Page/main/detail",{
        pagetitle : "trang detail"
    })
}
module.exports.favorite = async ( req,res)=>{
    const idUser = jwt.vetifyTk(req.cookies.tokenUser).userId
    const favorite = await FavoriteSong.find({
        user_id : idUser
    })
    const songs = []
    for(const fvr of favorite){
        const song = await Song.findOne({
            _id : fvr.songId
        })

        if(song){        
            const singer = await Singer.findOne({
                _id : song.singerId
            })
            song.fullName = singer.fullName
            songs.push(song)
        }
    }
    res.render("clients/Page/main/favorite",{
        pagetitle : "trang yêu thích",
        songs : songs,
        favorite : favorite
    })
}
module.exports.favoritePs = async (req,res)=>{
    const idSog = req.params.idSog
    const {status} = req.body
    const idUs = jwt.vetifyTk(req.cookies.tokenUser).userId
    if(!idUs){
        return res.status(401).json({message : "bạn chưa đn"})
    }
    if(status=== true){
        const check_fve = await FavoriteSong.findOneAndUpdate({
            user_id : idUs,
            songId : idSog,
        },{
            deleted : false,
        },{
            upsert : true ,new : true
        })
        return res.json({message : "đã thêm vào danh sách yêu thích",isFavorite : true})
    }
    else{
        const fvr_user = await FavoriteSong.updateOne({
            user_id : idUs,
            songId : idSog
        },{
            deleted : true,
            deletedAt : new Date()
        })
        return res.json({message : "đã xóa khỏi danh sách yêu thích",isFavorite : false})
    }
}
module.exports.history = async (req,res)=>{
    res.render("clients/Page/main/history",{
        pagetitle : "trang lịch sử nghe"
    })
}
