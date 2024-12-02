const { IpGroupRepository } = require('../../repository/ipGroup/ipGroupRepository')

const { GetAllIpGroupController } = require('../../controller/ipGroup/getAllIpGroupController')
const { GetAllIpGroupUseCase } = require('../../../application/useCase/ipGroup/getAllIpGroupUseCase')

const ipGroupRepository = new IpGroupRepository()

const getAllIpGroupUseCase = new GetAllIpGroupUseCase(ipGroupRepository)
const getAllIpGroupController = new GetAllIpGroupController(getAllIpGroupUseCase)

module.exports = { 
    getAllIpGroupController,
}
