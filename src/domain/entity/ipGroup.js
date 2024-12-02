const { sequelize } = require('../../database/sqlserver');
const { DataTypes } = require('sequelize');
const { InternetLevel } = require('./internetLevel');


const IpGroup = sequelize.define('IpGroup',{
    ip_group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    internet_level_id: {
        type: DataTypes.INTEGER,
        references: {
            model: InternetLevel,
            key: 'internet_level_id'
        }
    }
})

module.exports = { IpGroup }