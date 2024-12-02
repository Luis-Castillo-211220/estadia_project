const express = require('express');

const ipGroupRouter = express.Router();

const {
    getAllIpGroupController
} = require('../dependencies/ipGroup/ipGroupDependencies')

ipGroupRouter.get('/', getAllIpGroupController.run.bind(getAllIpGroupController));

module.exports = { ipGroupRouter }