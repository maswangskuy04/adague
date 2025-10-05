const User = require("../models/User")

async function findUserByEmailOrPhone(email, phone) {
    if (email) {
        const user = await User.findOne({ where: { email } })
        if (user) return user
    }

    if (phone) {
        const user = await User.findOne({ where: { phone } })
        if (user) return user
    }

    return null
}

function createOtpObject() {
    return {
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
        otpExpires: new Date(Date.now() + 5 * 60 * 1000)
    }
}

module.exports = { findUserByEmailOrPhone, createOtpObject }