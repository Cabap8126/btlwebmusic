const Topic = require('../../model/topic');
module.exports.index = async (req, res) => {
    const topics = await Topic.find({
        deleted : false
    });
    res.render("clients/Page/main/home",{
        topics: topics
    })
}