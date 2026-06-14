const Topic = require('../../model/topic');
module.exports.create  = async (req, res) => {
    const formbody =  req.body
    if(formbody){
        const topic = new Topic({formbody})
        await topic.save()
        res.redirect("/clients/topic")
    }
    else{
        console.log("không nhận được dữ liệu")
    }
}
module.exports.read = async (req, res) => {
    const topics = await Topic.find({
        status: "active"
    })
    console.log(topics)
}
module.exports.update = async (req, res) => {
    const id = req.params.id
    const formbody = req.body
    if(formbody && id){
        await Topic.updateOne({_id: id}, formbody)
        console.log("đã cập nhật")
    }
    else{
        console.log("không nhận đc data")
    }
}
module.exports.delete = async (req, res) => {
    const id = req.params.id
    if(id){
        await Topic.updateOne({_id: id}, {status: "inactive"})
        console.log("đã xóa")
    }
    else{
        console.log("không nhận đc id")
    }
}
