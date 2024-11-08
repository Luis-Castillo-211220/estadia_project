const { DataTypes } = require('sequelize')
// const { sequelize } = require('../../database/mysql')
const { sequelize } = require('../../database/sqlserver')
const { User } = require("./user")
const { IpAdresses } = require("./ipAddress")

const Device = sequelize.define('Devices', {
    device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ip_address_id: {
        type: DataTypes.INTEGER,
        references: {
            model: IpAdresses,
            key: 'ip_address_id'
        }
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    device_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    serial: {
        type: DataTypes.STRING,
        allowNull: true
    },
    patrimony: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    }
});

module.exports = { Device };