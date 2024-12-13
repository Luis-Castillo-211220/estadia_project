const express = require('express');

const ipGroupRouter = express.Router();

const {
    getAllIpGroupController,
    createIpGroupController
} = require('../dependencies/ipGroup/ipGroupDependencies')

ipGroupRouter.get('/', getAllIpGroupController.run.bind(getAllIpGroupController));
ipGroupRouter.post('/create/', createIpGroupController.run.bind(createIpGroupController));

module.exports = { ipGroupRouter }