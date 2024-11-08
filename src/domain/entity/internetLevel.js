const DataTypes = require('sequelize')
const { sequelize } = require('../../database/sqlserver')

const InternetLevel = sequelize.define('InternetLevel', {
    internet_level_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    internet_level_name: {
        type: DataTypes.STRING
    },
    privileges:{
        type: DataTypes.STRING,
    },
    internet_level_description: {
        type: DataTypes.STRING
    }
 
})

module.exports = { InternetLevel }