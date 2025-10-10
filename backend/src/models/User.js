const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Interest = require('./Interest')

const User = sequelize.define('User', {
    // profil utama
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
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
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // untuk OTP auth
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otpExpires: {
        type: DataTypes.DATE,
        allowNull: true
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
        type: DataTypes.ENUM('ready_to_chat', 'chatting'),
        defaultValue: 'ready_to_chat'
    },
    // status akun
    accountStatus: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended', 'banned'),
        defaultValue: 'active'
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

User.belongsToMany(Interest, { through: 'user_interests', as: 'interests' })
Interest.belongsToMany(User, { through: 'user_interests', as: 'users' })

module.exports = User