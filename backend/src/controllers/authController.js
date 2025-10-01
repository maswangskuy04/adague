const User = require('../models/User')
const generateToken = require('../helpers/token')
const { sendOtpToEmail } = require('../services/otpService')
// const { sendSmsOtp } = require('../services/smsService')

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString() 
}

exports.requestOtp = async (req, res) => {
    try {
        const { email, phone } = req.body

        if (!email && !phone) return res.status(400).json({ success: false, message: 'Kolom tidak boleh kosong' });

        const otp = generateOtp()
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000)

        // cari user kalau sudah ada
        let user = null

        if (email) {
            user = await User.findOne({ where: { email } })
        }

        if (!user && phone) {
            user = await User.findOne({ where: { phone } })
        }

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

        let user = null

        if (email) {
            user = await User.findOne({ where: { email } })
        }

        if (!user && phone) {
            user = await User.findOne({ where: { phone } })
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' })
        }

        // cek otp valid / tida
        if (user.otp !== otp || new Date() > user.otpExpires) {
            return res.status(400).json({ success: false, message: 'OTP tidak valid atau sudah kadaluarsa' })
        }

        // hapus otp setelah berhasil
        await user.update({ otp: null, otpExpires: null })

        // generate token JWT
        const token = generateToken({ id: user.id })

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