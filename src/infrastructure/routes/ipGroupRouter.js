const express = require('express');

const ipGroupRouter = express.Router();

const {
    getAllIpGroupController,
    createIpGroupController,
    changeInternetLevelGroupController
} = require('../dependencies/ipGroup/ipGroupDependencies')

ipGroupRouter.get('/', getAllIpGroupController.run.bind(getAllIpGroupController));
ipGroupRouter.post('/create/', createIpGroupController.run.bind(createIpGroupController));
ipGroupRouter.put('/changeInternetLevelGroup', changeInternetLevelGroupController.run.bind(changeInternetLevelGroupController));

module.exports = { ipGroupRouter }