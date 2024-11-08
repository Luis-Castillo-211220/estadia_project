const express = require('express')

const { createDeviceController,
    getAllDevicesController,
    getDeviceByIPAddressController,
    deleteDeviceByIPAddressController,
    getAllDevicesByIPAddressController,
    updateDeviceByIdController,
    getDevicesByNameController
} = require("../dependencies/device/devicesDependencies")

const deviceRouter = express.Router()

deviceRouter.post('/register/', createDeviceController.run.bind(createDeviceController)); //create
deviceRouter.get('/', getAllDevicesController.run.bind(getAllDevicesController)); // Get All
deviceRouter.get('/:ip_address', getDeviceByIPAddressController.run.bind(getDeviceByIPAddressController)); //Get By IP
deviceRouter.delete('/destroy/:ip_address', deleteDeviceByIPAddressController.run.bind(deleteDeviceByIPAddressController)); //Delete By IP
deviceRouter.get('/alldevices/:ip_address', getAllDevicesByIPAddressController.run.bind(getAllDevicesByIPAddressController)); //Get By IP (Wildcard)
deviceRouter.put('/update/:device_id', updateDeviceByIdController.run.bind(updateDeviceByIdController));
deviceRouter.get('/getAll/:owner_name', getDevicesByNameController.run.bind(getDevicesByNameController));


module.exports = { deviceRouter }   