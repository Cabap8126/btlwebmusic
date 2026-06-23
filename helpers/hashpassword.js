const bcrypt = require('bcrypt');
const saltRounds = 10; 
module.exports.passwordHasign = async (x)=>{
    const hash = bcrypt.hashSync(x, saltRounds);
    return hash;
}
module.exports.checkpassword = async (x,psUser)=>{
    const checkPw = bcrypt.compareSync(x,psUser)
    return checkPw
}