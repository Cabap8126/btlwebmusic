const nodemailer = require("nodemailer");
module.exports.sendMail = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error; 
    }
}
