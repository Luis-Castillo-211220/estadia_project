const { DataTypes } = require('sequelize')
// const { sequelize } = require('../../database/mysql')
const { sequelize } = require('../../database/sqlserver')

const Ubication = sequelize.define('Ubication', {
    ubication_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    Ubication_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deparment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = { Ubication };