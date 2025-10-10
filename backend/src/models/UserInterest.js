const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const UserInterest = sequelize.define('UserInterest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    tableName: 'user_interests',
    timestamps: false
})

module.exports = UserInterest