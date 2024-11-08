const express = require('express');

const ipAdressesRouter = express.Router();

const {
    getAllIpAddressController,
    createIpAddressController,
    getAllIpAddressesAvailableController,
    deleteIpAddressController
} = require('../dependencies/ipAdresses/ipAdressesDependencies')

ipAdressesRouter.get('/', getAllIpAddressController.run.bind(getAllIpAddressController));
ipAdressesRouter.post('/register/', createIpAddressController.run.bind(createIpAddressController));
ipAdressesRouter.get('/ip/available/', getAllIpAddressesAvailableController.run.bind(getAllIpAddressesAvailableController));
ipAdressesRouter.delete('/destroy/:ip_address', deleteIpAddressController.run.bind(deleteIpAddressController));

module.exports = { ipAdressesRouter }