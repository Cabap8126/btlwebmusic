// ramdom string token
module.exports.ramdomToken = (x)=>{
    const charToken = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789"
    let token ="";
    for(let i = 0 ; i < x; i+=1){
        token += charToken.charAt(Math.floor(Math.random() * charToken.length))
    }
    return token
}//end
// ramdom otp
module.exports.ramdomNumber = (x)=>{
    const charNb ="0123456789"
    let number = ""
    for(let i = 0 ; i < x ; i ++){
        number += charNb.charAt(Math.floor(Math.random() * charNb.length))
    }
    return number
}
// end
