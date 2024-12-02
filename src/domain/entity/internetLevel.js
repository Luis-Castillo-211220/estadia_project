const DataTypes = require('sequelize')
const { sequelize } = require('../../database/sqlserver')

const InternetLevel = sequelize.define('InternetLevel', {
    internet_level_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    allowed_services: {
        type: DataTypes.STRING,
        allowNull: true
    },
    allowed_timeframe: {
        type: DataTypes.STRING,
        defaultValue: 'always'
    },
    bandwidth_limit: {
        type: DataTypes.INTEGER // Kbps
    },
    priority:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
 
})

module.exports = { InternetLevel }