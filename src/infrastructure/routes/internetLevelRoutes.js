const express = require('express')

const internetLevelRouter = express.Router();

const { 
    createInternetLevelController,
    deleteInternetLevelByIdController
} = require("../dependencies/internetLevel/internetLevelDependencies")

internetLevelRouter.post('/create/', createInternetLevelController.run.bind(createInternetLevelController));
internetLevelRouter.delete('/destroy/:internet_level_id', deleteInternetLevelByIdController.run.bind(deleteInternetLevelByIdController));

module.exports = { internetLevelRouter }