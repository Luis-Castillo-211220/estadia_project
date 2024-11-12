const { InternetLevelRepository } = require("../../repository/internetLevel/internetLevelRepository")

const { CreateInternetLevelUseCase } = require("../../../application/useCase/internetLevel/createInternetLevelUseCase")
const { CreateInternetLevelController } = require("../../controller/internetLevel/createInternetLevelController")

const internetLevelRepository = new InternetLevelRepository()

const createInternetLevelUseCase = new CreateInternetLevelUseCase(internetLevelRepository)
const createInternetLevelController = new CreateInternetLevelController(createInternetLevelUseCase)

module.exports = { 
    createInternetLevelController, 
}