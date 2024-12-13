const { IpGroupRepository } = require('../../repository/ipGroup/ipGroupRepository')

const { GetAllIpGroupController } = require('../../controller/ipGroup/getAllIpGroupController')
const { GetAllIpGroupUseCase } = require('../../../application/useCase/ipGroup/getAllIpGroupUseCase')

const { CreateIpGroupUseCase } = require('../../../application/useCase/ipGroup/createIpGroupUseCase')
const { CreateIpGroupController } = require('../../controller/ipGroup/createIpGroupController')

const ipGroupRepository = new IpGroupRepository()

const getAllIpGroupUseCase = new GetAllIpGroupUseCase(ipGroupRepository)
const getAllIpGroupController = new GetAllIpGroupController(getAllIpGroupUseCase)

const createIpGroupUseCase = new CreateIpGroupUseCase(ipGroupRepository)
const createIpGroupController = new CreateIpGroupController(createIpGroupUseCase)

module.exports = { 
    getAllIpGroupController,
    createIpGroupController
}
