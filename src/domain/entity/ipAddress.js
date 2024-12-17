const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database/sqlserver')
const { InternetLevel } = require('../entity/internetLevel')
const { IpGroup } = require('../entity/ipGroup')

const IpAdresses = sequelize.define('IpAdresses', {
    ip_address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isIPv4: true
        }
    },
    mask: {
        type: DataTypes.STRING,
        validate: {
            isIPv4: true
        },
        unique: false
    },
    mac_address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$"
        },
        unique: false,
    },
    ubication:{
        type: DataTypes.STRING,
        allowNull: true
    },
    internet_level_id:{ //id llave foranea
        type: DataTypes.INTEGER,
        references: {
            model: InternetLevel,
            key: 'internet_level_id'
        },
        allowNull: true
    },
    ip_group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: IpGroup,
            key: 'ip_group_id'
        },
        allowNull: true
    },
    proxy: {
        type: DataTypes.STRING,
        validate: {
            isIPv4: true
        },
        unique: false,
        allowNull: true
    },
    available:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    observations: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    hooks: {
        beforeValidate: (instance, options) => {
            if(instance.available && (instance.mac_address != null || instance.owner_name != null || instance.ubication != null || instance.internet_level != null)) {
                throw new Error('No se pueden tener campos con una IP disponible')
            }
        },
        beforeCreate: (ipAddress) => {
            if(ipAddress.internet_level && ipAddress.group){
                throw new Error('Una Direccion Ip no puede estar asociada a un grupo si ya tiene un nivel de internet y a un grupo de IP al mismo tiempo.')
            }
        },
        beforeUpdate: (ipAddress) => {
            if(ipAddress.internet_level && ipAddress.group){
                throw new Error('Una Direccion Ip no puede estar asociada a un grupo si ya tiene un nivel de internet y a un grupo de IP al mismo tiempo.')
            }
        }
    }
});

module.exports = { IpAdresses }