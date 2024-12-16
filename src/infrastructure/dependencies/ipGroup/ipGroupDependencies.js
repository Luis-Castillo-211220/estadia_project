const { IpGroupRepository } = require('../../repository/ipGroup/ipGroupRepository')

const { GetAllIpGroupController } = require('../../controller/ipGroup/getAllIpGroupController')
const { GetAllIpGroupUseCase } = require('../../../application/useCase/ipGroup/getAllIpGroupUseCase')

const { CreateIpGroupUseCase } = require('../../../application/useCase/ipGroup/createIpGroupUseCase')
const { CreateIpGroupController } = require('../../controller/ipGroup/createIpGroupController')

const { ChangeInternetLevelGroupUseCase } = require('../../../application/useCase/ipGroup/changeInternetLevelGroupUseCase')
const { ChangeInternetLevelGroupController } = require('../../controller/ipGroup/changeInternetLevelGroupController')

const ipGroupRepository = new IpGroupRepository()

const getAllIpGroupUseCase = new GetAllIpGroupUseCase(ipGroupRepository)
const getAllIpGroupController = new GetAllIpGroupController(getAllIpGroupUseCase)

const createIpGroupUseCase = new CreateIpGroupUseCase(ipGroupRepository)
const createIpGroupController = new CreateIpGroupController(createIpGroupUseCase)

const changeInternetLevelGroupUseCase = new ChangeInternetLevelGroupUseCase(ipGroupRepository)
const changeInternetLevelGroupController = new ChangeInternetLevelGroupController(changeInternetLevelGroupUseCase)

module.exports = { 
    getAllIpGroupController,
    createIpGroupController,
    changeInternetLevelGroupController,
}
