const validator = require('deep-email-validator');
module.exports.checkemail = async (email) => {
    const mail = await validator.validate({
        email: email,
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: false
    });
    if (!mail.valid) {
        return false;
    }
    const ded = email.split('@')[1]
    const stm = ded.substring(0, 6);
    if(stm === "gmail."){
        return true
    }
    else{
        return false
    }
};