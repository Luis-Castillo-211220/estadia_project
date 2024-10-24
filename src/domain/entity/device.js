const { DataTypes } = require('sequelize')
// const { sequelize } = require('../../database/mysql')
const { sequelize } = require('../../database/sqlserver')

const Device = sequelize.define('Devices', {
    device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIPv4: true
        },
        unique: true
    },
    mac_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$"
        },
        unique: true,
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubication:{
        type: DataTypes.STRING,
        allowNull: false
    },
    internet_level:{
        type: DataTypes.STRING,
        allowNull: false
    },
    proxy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIPv4: true
        },
        unique: false
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
    observations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // groups:{
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     defaultValue: [],
    //     allowNull: true
    // }
    groups: {
        type: DataTypes.STRING,  //Si es mas de un campo delimitar por comas (,) o guiones (-)
        allowNull: true,
        // defaultValue: '[]',
        // get(){
        //     return JSON.parse(this.getDataValue('groups'));
        // },
        // set(value){
        //     this.setDataValue('groups', JSON.stringify(value));
        // }
    }
});

module.exports = { Device };