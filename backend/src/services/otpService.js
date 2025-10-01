const tranporter = require('../utils/mailer')

async function sendOtpToEmail(email, otp) {
    const mailOptions = {
        from: `GueAda <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'OTP Code',
        text: `Your OTP code is <b>${otp}</b>.`
    }

    await tranporter.sendMail(mailOptions)
    console.log(`OTP ${otp} sent to mail: ${email}`)
    return otp
}

module.exports = { sendOtpToEmail }