const User = require('../models/User')
const bcrypt = require('bcrypt')
const generateToken = require('../helpers/token')

exports.login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) return res.status(400).json({ success: false, message: 'Email atau Password tidak boleh kosong' });

    try {
        const user = await User.findOne({ where: { email } })
        
        if(!user) return res.status(404).json({ success: false, message: 'Email belum terdaftar' });

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) return res.status(400).json({ success: false, message: 'Password salah' });

        const token = generateToken(user)

        const { password: _, ...dataUser } = user.toJSON()

        return res.status(200).json({ success: true, message: 'Berhasil masuk', token, user: dataUser })
    } catch (err) {
        console.error('Error Login: ', err)
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
}

exports.register = async (req, res) => {
    const { fullname, username, email, password } = req.body

    if(!username || !fullname || !email || !password) return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });

    try {
        const user = await User.findOne({ where: { email } })

        if(user) return res.status(400).json({ success: false, message: 'Email sudah digunakan' });

        const hashPassword = await bcrypt.hash(password, 10)

        const create = await User.create({
            username,
            fullname,
            email,
            password: hashPassword,
        })

        return res.status(201).json({
            success: true,
            message: 'Berhasil mendaftar',
            user: {
                id: create.id,
                username: create.username,
                fullname: create.fullname,
                email: create.email
            }
        })
    } catch (err) {
        console.error('Error Register: ', err)
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
}