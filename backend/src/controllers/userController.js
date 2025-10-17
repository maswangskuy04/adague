const { Op } = require('sequelize');
const Interest = require('../models/Interest');
const User = require('../models/User');
const { deleteAvatarFile } = require('../helpers/user');
const LoginHistory = require('../models/LoginHistory');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password', 'deletedAt'] },
            include: [{
                model: Interest,
                as: 'interests',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        })

        if(!user) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });

        return res.status(200).json({ success: true, user })
    } catch (err) {
        console.error('Error fecth user: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.getInterest = async (req, res) => {
    try {
        const interests = await Interest.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
        })

        return res.status(200).json({ success: true, interests })
    } catch (err) {
        console.error('Error fetch interests: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.id
        const { fullname, username, email, bio, interests } = req.body

        if (email) {
            const existingUser = await User.findOne({
                where: {
                    email,
                    id: {
                        [Op.ne]: userId
                    }
                }
            })

            if (existingUser) return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
        }

        await User.update({ fullname, username, ...(email && { email }), bio }, { where: { id: userId } })

        if (Array.isArray(interests)) {
            const user = await User.findByPk(userId)

            if (user) {
                await user.setInterests(interests)
            }
        }

        const userData = await User.findByPk(userId, {
            attributes: {
                exclude: ['password', 'deletedAt']
            },
            include: ['interests']
        })

        return res.status(200).json({ success: true, message: 'Profil berhasil di perbarui', user: userData })
    } catch (err) {
        console.error('Update profile error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.uploadAvatar = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByPk(userId)

        if (!req.file) return res.status(400).json({ success: false, message: 'File tidak ada' });

        if (!user) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });

        if (user.avatar) {
            await deleteAvatarFile(user.avatar)
        }

        const avatarPath = `avatar/${req.file.filename}`
        await user.update({ avatar: avatarPath })

        return res.status(200).json({ success: true, message: 'Foto profil berhasil diperbarui', avatar: `/api/uploads/${avatarPath}` })
    } catch (err) {
        console.error('Update avatar error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.deleteAvatar = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByPk(userId)

        if (!user || !user.avatar) {
            return res.status(404).json({ success: false, message: 'Foto profil tidak ditemukan' })
        }

        // hapus avatar lama
        await deleteAvatarFile(user.avatar)

        // update ke database jadi null
        await user.update({ avatar: null })

        return res.status(200).json({ success: true, message: 'Foto profil berhasil dihapus' })
    } catch (err) {
        console.error('Delete avatar error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.updateAnonim = async (req, res) => {
    try {
        const userId = req.user.id
        const { isAnonim } = req.body

        if (typeof isAnonim !== 'number' || ![0, 1].includes(isAnonim)) {
            return res.status(400).json({ success: false, message: 'Gagal update sebagai user anonim' })
        }

        const user = await User.findByPk(userId)
        if (!user) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });

        await user.update({ isAnonim })

        return res.status(200).json({ success: true, message: `Berhasil ${isAnonim === 1 ? 'mengaktifkan' : 'menonaktifkan'} anonim`, isAnonim })
    } catch (err) {
        console.error('Update anonim error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.getAnonim = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByPk(userId, {
            attributes: ['id', 'isAnonim']
        })

        if (!user) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });

        return res.status(200).json({ success: true, isAnonim: user.isAnonim })
    } catch (err) {
        console.error('Get anonim error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.getLoginHistory = async (req, res) => {
    try {
        const history = await LoginHistory.findAll({
            where: { userId: req.user.id },
            order: [['loggedInAt', 'DESC']],
            limit: 5
        })
    
        res.json(history)
    } catch (err) {
        console.error('Get login history error: ', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}