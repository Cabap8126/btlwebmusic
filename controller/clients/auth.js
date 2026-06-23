const User = require("../../model/user")
const ForgotPsw = require("../../model/forgot.model")
const hashps = require("../../helpers/hashpassword")
const jwtToken = require("../../helpers/jwt")
const checkEmail = require("../../helpers/checkmail")
const sendEmail = require("../../helpers/sendmail")
const ramdom = require("../../helpers/ramdom")
module.exports.login = async (req, res) => {
    res.render("clients/Page/auth/login", {
        pagetile: "trang đăng nhập"
    })
}
module.exports.loginpost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: email,
        status: "active"
    });
    if (!user) {
        req.flash('error', "Email hoặc mật khẩu không chính xác");
        return res.redirect(`/auth/login`);
    }
    const checkPassword = hashps.checkPassword(password, user.password);
    if (!checkPassword) {
        req.flash("error", "Email hoặc mật khẩu không chính xác");
        return res.redirect(`/auth/login`);
    }
    const tokenS = jwtToken.tokenUser(user.id);
    res.cookie("tokenUser", tokenS, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.redirect("/");
};
module.exports.register = async (req, res) => {
    res.render("clients/Page/auth/register", {
        pagetitle: "trang đăng kí"
    })
}
module.exports.registerPs = async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.fullname;
        const password = req.body.password;
        const isMail = await checkEmail.checkemail(email)
        if (!isMail) {
            req.flash("error", "vui lòng nhập email chính xác")
            return res.redirect("/auth/register")
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            if (existingUser.status === "active") {
                req.flash('error', "Email này đã được sử dụng!");
                return res.redirect("/auth/register")
            }
        } else {
            const token = ramdom.ramdomToken(20)
            const hspass = await hashps.passwordHasign(password)
            const newUser = new User({
                fullname: name,
                email: email,
                password: hspass,
                status: "inactive",
                tokenUser : token
            });
            await newUser.save();
        }
        const otp = ramdom.ramdomNumber(8);
        const otpobj = {
            email: email,
            otp: otp,
            op: "register",
            expireAt: Date.now() + 3 * 60 * 1000
        };
        const forgot = new ForgotPsw(otpobj);
        await forgot.save();
        const subject = "Mã otp xác minh tài khoản";
        const html = `Mã OTP để xác minh tài khoản : <b>${otp}</b>. Thời hạn 3 phút`;
        await sendEmail.sendMail(email, subject, html);
        res.redirect(`/auth/otp?email=${email}&op=register`);
    } catch (error) {
        req.flash("error", "Á à m fake mail à")
        res.redirect("/auth/register")
    }
}
module.exports.forgot = async (req, res) => {
    res.render("clients/Page/auth/forgotpassword", {
        pagetitle: "Quên mật khẩu"
    })
}
module.exports.fotgotPs = async (req, res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({
            email: email,
            status: "active"
        })
        if (!user) {
            req.flash("error", "tài khoản không tồn tại")
            return res.redirect("/auth/forgotPw")
        }
        const otp = ramdom.ramdomNumber(8);
        const otpobj = {
            email: email,
            otp: otp,
            op: "register",
            expireAt: Date.now() + 3 * 60 * 1000
        };
        const forgot = new ForgotPsw(otpobj);
        await forgot.save()
        const subject = "Mã otp xác minh tài khoản";
        const html = `Mã OTP để xác minh tài khoản : <b>${otp}</b>. Thời hạn 3 phút`;
        await sendEmail.sendMail(email, subject, html);
        res.redirect(`/auth/otp?email=${email}&op=forgotPw`);
    }catch(error){
        req.flash("error", "đã xảy ra lỗi vui lòng thử lại")
        res.redirect("/auth/forgotPw")
    }
}
module.exports.otp = async (req, res) => {
    const email = req.query.email
    const op = req.query.op
    res.render("clients/Page/auth/otpPassword", {
        pagetitle: "Nhập mã Otp",
        email: email,
        op: op
    })
}
module.exports.otpPost = async (req, res) => {
    const email = req.body.email
    const otp = req.body.otp
    const op = req.query.op
    switch (op) {
        case 'register':
            const register = await ForgotPsw.find({
                email: email,
                op: "register"
            })
            if (otp === register.at(-1).otp) {
                req.flash("success", "mã hợp lệ")
                const updatedUser = await User.findOneAndUpdate(
                    { email: email },
                    {
                        status: "active",
                        expireAt: null
                    }, { new: true } // new trả về dữ liệu mới ngay sau khi cập nhập
                );
                if (!updatedUser) {
                    req.flash("error", "Không tìm thấy người dùng");
                    return res.redirect("/auth/login");
                }
                const tokenS = jwtToken.tokenUser(updatedUser.tokenUser);
                res.cookie("tokenUser", tokenS, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                });
                return res.redirect("/");
            }
            else {
                req.flash("error", "vui lòng lấy mã otp mới nhất")
                res.redirect(`/auth/opt?email=${email}&op=${op}`)
            }
        case 'forgotPw':
            const fotgot = await ForgotPsw.find({
                email: email,
                op: "forgotPw",
            })
            if (!forgot) {
                req.flash("error", "otp không tồn tại hoặc đã hết hạn")
                return res.redirect("/auth/otp");
            }
            if (otp === forgot.at(-1).otp) {
                const user = await User.findOne({
                    email : email
                })
                if(!user){
                    req.flash("error","tài khoản không tồn tại");
                    return res.redirect("/auth/otp")
                }
                const tokenS = jwtToken.tokenUser(user.tokenUser);
                res.cookie("tokenUser", tokenS, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                });
                req.flash("success", "opt hợp lệ")
                return res.redirect("/auth/resetPw");
            }
            else {
                req.flash("error", "otp khong hop le hoac da he han");
                return res.redirect("/auth/otp");
            }
    }
    res.send("oke")
}
module.exports.reset = async (req,res)=>{
    res.render("clients/Page/auth/reset",{
        pagetitle : "reset password"
    })
}
module.exports.resetPw = async (req,res)=>{
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const tokenUser = req.cookie.tokenUser
    if(password === confirmPassword){
        const hspass = await hashps.passwordHasign(password)
        const user = await User.findOne({
            tokenUser : tokenUser
        })
        if(!user){
            req.flash("error","tài khoản không tồn tại")
            return res.redirect("/auth/resetPw")
        }
        await User.updateOne({tokenUser : tokenUser},{password : hspass})
        return res.redirect("/")
    }
    else{
        req.flash("error","mật khẩu không trùng khớp")
        return res.redirect("/auth/reset")
    }
}