const Song = require('../../model/song');
module.exports.index = (req, res) => {
    res.render("clients/Page/main/index",
        {titlePage : "Trang chủ",}
    )
}
module.exports.create  = async (req, res) => {
    const formbody =  req.body
    if(formbody){
        const song = new Song(formbody)
        await song.save()
        res.redirect("/clients/song")
    }
    else{
        console.log("không nhận được dữ liệu")
    }
}
module.exports.read = async (req, res) => {
    const songs = await Song.find({
        status: "active"
    })
    console.log(songs)
}
module.exports.update = async (req, res) => {
    const id = req.params.id
    const formbody = req.body
    if(formbody && id){
        await Song.updateOne({_id: id}, formbody)
        console.log("đã cập nhật")
    }
    else{
        console.log("không nhận đc data")
    }
}
module.exports.delete = async (req, res) => {
    const id = req.params.id
    if(id){
        await Song.updateOne({_id: id}, {status: "inactive"})
        console.log("đã xóa")
    }
    else{
        console.log("không nhận đc id")
    }
}
const songRouter = require("./song")
const singerRouter = require("./singer")
module.exports = ( app ) => {
    app.use("/clients/song", songRouter)
    app.use("/clients/singer", singerRouter)
}
const express = require('express');
const router = express();
const controller = require("../../controller/clients/song")
