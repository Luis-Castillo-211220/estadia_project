const { Sequelize } = require('sequelize');
const { types } = require('pg');
require('dotenv').config()

                                //Database              User              password
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost', // O IP del servidor
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Activar si es necesario (depende del servidor)
      trustServerCertificate: true, // Solo en entorno de desarrollo
    },
  },
  logging: false, // Desactiva los logs de Sequelize
});



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