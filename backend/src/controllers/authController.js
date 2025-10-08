const User = require('../models/User')
const generateToken = require('../helpers/token')
const { sendOtpToEmail } = require('../services/otpService')
const { findUserByEmailOrPhone, createOtpObject } = require('../helpers/auth')
// const { sendSmsOtp } = require('../services/smsService')

exports.requestOtp = async (req, res) => {
    try {
        const { email, phone } = req.body

        if (!email && !phone) return res.status(400).json({ success: false, message: 'Kolom tidak boleh kosong' });

        // cari user kalau sudah ada
        let user = await findUserByEmailOrPhone(email, phone)

        // kalau user sudah ada dan punya password, abaikan otp
        if (user && user.password) {
            return res.json({ success: false, requiredPassword: true })
        }

        // generate OTP
        const { otp, otpExpires } = createOtpObject()

        // kalau belum ada user, bikin baru hanya simpan email dan no telpon
        if (!user) {
            user = await User.create({ email, phone, otp, otpExpires })
        } else {
            await user.update({ otp, otpExpires })
        }

        // kirim otp
        if (email) await sendOtpToEmail(email, otp);
        
        return res.json({ success: true, message: 'OTP terkirim' })
    } catch (err) {
        console.error('Request otp error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { email, phone, otp } = req.body

        if ((!email && !phone) || !otp) {
            return res.status(400).json({ success: false, message: 'Kolom tidak boleh kosong' })
        }

        let user = await findUserByEmailOrPhone(email, phone)

        if (!user) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });

        // validasi OTP
        if (user.otp !== otp || new Date() > user.otpExpires) {
            return res.status(400).json({ success: false, message: 'OTP tidak valid atau sudah kadaluarsa' })
        }

        // hapus OTP + verifikasi email
        await user.update({ otp: null, otpExpires: null, emailVerified: true });

        // generate token JWT
        const token = generateToken({ id: user.id, email: user.email, role: user.role })

        return res.json({
            success: true,
            message: 'OTP berhasil diverifikasi',
            token,
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone
            }
        })
    } catch (err) {
        console.error('Verify otp error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}