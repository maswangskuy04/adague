const nodemailer = require('nodemailer')

const tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

module.exports = tranporter