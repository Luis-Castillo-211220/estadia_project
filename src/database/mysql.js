const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    logging: false
})

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been stablished successfully')
        await sequelize.sync({force: false}); //cambiar a true si se requiere re sincronizar la base de datos - If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
        console.log('Database synchronized successfully')
    }catch(err){
        console.error('Unable to connect to database', err)
    }
}

module.exports = { sequelize, connectDB }