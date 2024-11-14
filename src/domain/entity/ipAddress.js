const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database/sqlserver')
const { InternetLevel } = require('../entity/internetLevel')

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
            is: "/^(128|192|224|240|248|252|254|255)\.0\.0\.0$|^255\.(0|128|192|224|240|248|252|254|255)\.0\.0$|^255\.255\.(0|128|192|224|240|248|252|254|255)\.0$|^255\.255\.255\.(0|128|192|224|240|248|252|254|255)$/"
        }
    },
    mac_address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$"
        },
        unique: true,
    },
    ubication:{
        type: DataTypes.STRING,
        allowNull: true
    },
    internet_level:{ //id llave foranea
        type: DataTypes.INTEGER,
        references: {
            model: InternetLevel,
            key: 'internet_level_id'
        }
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
            // if(!instance.available && instance.mac_address == null){
            //     throw new Error('No puede tener MAC Address y estar disponible al mismo tiempo');
            // }

            if(instance.available && (instance.mac_address != null || instance.owner_name != null || instance.ubication != null || instance.internet_level != null)) {
                throw new Error('No se pueden tener campos con una IP disponible')
            }
        }
    }
});

module.exports = { IpAdresses }