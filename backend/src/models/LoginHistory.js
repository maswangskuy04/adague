const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('../models/User')

const LoginHistory = sequelize.define('LoginHistory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    sessionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deviceType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    loggedInAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'login_histories',
    paranoid: true
})

User.hasMany(LoginHistory, { foreignKey: 'userId', as: 'loginHistory' })
LoginHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' })

module.exports = LoginHistory