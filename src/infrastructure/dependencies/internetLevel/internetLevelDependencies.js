const { InternetLevelRepository } = require("../../repository/internetLevel/internetLevelRepository")

const { CreateInternetLevelUseCase } = require("../../../application/useCase/internetLevel/createInternetLevelUseCase")
const { CreateInternetLevelController } = require("../../controller/internetLevel/createInternetLevelController")
const { DeleteInternetLevelByIdUseCase } = require("../../../application/useCase/internetLevel/deleteInternetLevelByIdUseCase")
const { DeleteInternetLevelByIdController } = require("../../controller/internetLevel/deleteInternetLevelByIdController")

const internetLevelRepository = new InternetLevelRepository()

const createInternetLevelUseCase = new CreateInternetLevelUseCase(internetLevelRepository)
const createInternetLevelController = new CreateInternetLevelController(createInternetLevelUseCase)

const deleteInternetLevelByIdUseCase = new DeleteInternetLevelByIdUseCase(internetLevelRepository)
const deleteInternetLevelByIdController = new DeleteInternetLevelByIdController(deleteInternetLevelByIdUseCase)

module.exports = { 
    createInternetLevelController,
    deleteInternetLevelByIdController,
}