const { IpAdressesRepository } = require('../../repository/ipAdresses/ipAdressesRepository')

const { GetAllIpAdressesUseCase } = require('../../../application/useCase/ipAdresses/getAllIpAdressesUseCase')
const { GetAllIpAdressesController } = require('../../controller/ipAdresses/getAllIpAdressesController')

const { CreateIpAddressUseCase } = require("../../../application/useCase/ipAdresses/createIpAddressUseCase")
const { CreateIpAddressController } = require("../../controller/ipAdresses/createIpAddressController")

const { GetAllIpAddressesAvailableUseCase } = require("../../../application/useCase/ipAdresses/getAllIpAddressesAvailableUseCase")
const { GetAllIpAddressesAvailableController } = require("../../controller/ipAdresses/getAllIpAddressesAvailableController")

const { DeleteIpAddressUseCase } = require("../../../application/useCase/ipAdresses/deleteIpAddressUseCase")
const { DeleteIpAddressController } = require("../../controller/ipAdresses/deleteIpAddressController")

const ipAdressesRepository = new IpAdressesRepository()

const getAllIpAdressesUseCase = new GetAllIpAdressesUseCase(ipAdressesRepository)
const getAllIpAddressController = new GetAllIpAdressesController(getAllIpAdressesUseCase)

const createIpAddressUseCase = new CreateIpAddressUseCase(ipAdressesRepository)
const createIpAddressController = new CreateIpAddressController(createIpAddressUseCase)

const getAllIpAddressesAvailableUseCase = new GetAllIpAddressesAvailableUseCase(ipAdressesRepository)
const getAllIpAddressesAvailableController = new GetAllIpAddressesAvailableController(getAllIpAddressesAvailableUseCase)

const deleteIpAddressUseCase = new DeleteIpAddressUseCase(ipAdressesRepository)
const deleteIpAddressController = new DeleteIpAddressController(deleteIpAddressUseCase)

module.exports = {
    getAllIpAddressController,
    createIpAddressController,
    getAllIpAddressesAvailableController,
    deleteIpAddressController
}