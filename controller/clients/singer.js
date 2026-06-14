const Singer = require('../../model/single');
module.exports.create  = async (req, res) => {
    const formbody =  req.body
    if(formbody){
        const singer = new Singer(formbody)
        await singer.save()
        res.redirect("/clients/singer")
    }
    else{
        console.log("không nhận được dữ liệu")
    }
}
module.exports.read = async (req, res) => {
    const singers = await Singer.find({
        status: "active"
    })
    console.log(singers)
}
module.exports.update = async (req, res) => {
    const id = req.params.id
    const formbody = req.body
    if(formbody && id){
        await Singer.updateOne({_id: id}, formbody)
        console.log("đã cập nhật")
    }
    else{
        console.log("không nhận đc data")
    }
}
module.exports.delete = async (req, res) => {
    const id = req.params.id
    if(id){
        await Singer.updateOne({_id: id}, {status: "inactive"})
        console.log("đã xóa")
    }
    else{
        console.log("không nhận đc id")
    }
}
