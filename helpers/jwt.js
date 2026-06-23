const jwt = require("jsonwebtoken")
module.exports.tokenUser = (id)=>{
    const token = jwt.sign({userId:id},
        process.env.JWT_SECRET,
        {expiresIn : '1d'}
    )
    return token
}