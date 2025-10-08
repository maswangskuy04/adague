const User = require('../models/User')

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password', 'deletedAt'] }
        })

        if(!user) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });


        return res.status(200).json({ success: true, user })
    } catch (err) {
        console.error('Error fecth user: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}