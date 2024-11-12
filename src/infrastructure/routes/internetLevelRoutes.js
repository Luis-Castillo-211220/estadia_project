const express = require('express')

const internetLevelRouter = express.Router();

const { 
    createInternetLevelController
} = require("../dependencies/internetLevel/internetLevelDependencies")

internetLevelRouter.post('/create/', createInternetLevelController.run.bind(createInternetLevelController));

module.exports = { internetLevelRouter }