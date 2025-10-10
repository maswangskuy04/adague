const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Interest = sequelize.define('Interest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'interests',
    timestamps: false,
    paranoid: true
})

module.exports = Interest