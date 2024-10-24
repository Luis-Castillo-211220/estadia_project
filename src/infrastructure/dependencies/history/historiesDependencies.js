const { HistoryRepository } = require("../../repository/history/postgresqlRepository")

const { GetAllHistoryUseCase } = require("../../../application/useCase/history/getAllHistoryUseCase")
const { GetAllHistoryController } = require("../../controller/history/getAllHistoryController")
const { GetHistoryByNameUseCase } = require("../../../application/useCase/history/getHistoryByNameUseCase")
const { GetHistoryByNameController } = require("../../controller/history/getAllHistoryByNameController")
const { GetHistoryByDateUseCase } = require("../../../application/useCase/history/getHistoryByDateUseCase")
const { GetHistoryByDateController } = require("../../controller/history/getHistoryByDateController")

const historyRepository = new HistoryRepository()

const getAllHistoryUseCase = new GetAllHistoryUseCase(historyRepository)
const getAllHistoryController = new GetAllHistoryController(getAllHistoryUseCase)

const getHistoryByNameUseCase = new GetHistoryByNameUseCase(historyRepository)
const getHistoryByNameController = new GetHistoryByNameController(getHistoryByNameUseCase)

const getHistoryByDateUseCase = new GetHistoryByDateUseCase(historyRepository)
const getHistoryByDateController = new GetHistoryByDateController(getHistoryByDateUseCase)

module.exports = { 
    getAllHistoryController,
    getHistoryByNameController,
    getHistoryByDateController  
};