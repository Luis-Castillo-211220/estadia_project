const { Sequelize } = require('sequelize');
const { types } = require('pg');
require('dotenv').config()
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
        const applyAssocitations = require('../domain/associations/associations')
        applyAssocitations();
        await sequelize.authenticate();
        console.log('Connection has been stablished successfully')
        await sequelize.sync({force: false}).then(() => {
          console.log('Tablas creadas correctamente.');
        })
        .catch((error) => {
          console.error('Error al sincronizar la base de datos:', error);
        });
        console.log('Database synchronized successfully')
    }catch(err){
        console.error('Unable to connect to database', err)
    }
}

module.exports = { sequelize, connectDB }