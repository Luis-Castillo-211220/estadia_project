const { DataTypes } = require('sequelize')
// const { sequelize } = require('../../database/mysql')
const { sequelize } = require('../../database/sqlserver')

const History = sequelize.define('History', {
    history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    user_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
    },
    time: {
        type: DataTypes.TIME,
    },
    action: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = { History }