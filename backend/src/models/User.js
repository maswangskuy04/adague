const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    // profil utama
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // profil tambahan
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // status percakapan
    chatStatus: {
        type: DataTypes.ENUM('siap_ngobrol', 'sedang_ngobrol'),
        defaultValue: 'siap_ngobrol'
    },
    // status akun
    accountStatus: {
        type: DataTypes.ENUM('aktif', 'nonaktif', 'ditangguhkan', 'diblokir'),
        defaultValue: 'aktif'
    },
    isAnonim: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    // autentifikasi & hak akses
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    // aktivitas
    isOnline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    lastSeen: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    lastActiveChatId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    totalChats: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'users',
    paranoid: true
})

module.exports = User