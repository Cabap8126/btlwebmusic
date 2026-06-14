const mongoose = require("mongoose");
module.exports.connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGOOSEURL);
        console.log("Connect Success")
    }
    catch(error){
        console.log(error)
    }
}