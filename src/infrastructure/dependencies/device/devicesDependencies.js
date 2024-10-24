const { DeviceRepository } = require("../../repository/device/mysqlRepository")

const { CreateDeviceUseCase } = require("../../../application/useCase/device/createDeviceUseCase")
const { CreateDeviceController } = require("../../controller/device/createDeviceController")
const { GetAllDevicesUseCase } = require("../../../application/useCase/device/getAllDevicesUseCase")
const { GetAllDevicesController } = require("../../controller/device/getAllDevicesController")
const { GetDeviceByIPAddressUseCase } = require("../../../application/useCase/device/getDeviceByIPAddressUseCase")
const { GetDeviceByIPAddressController } = require("../../controller/device/getDeviceByIPAddressController")
const { DeleteDeviceByIPAddressUseCase } = require("../../../application/useCase/device/deleteDeviceByIPAddressUseCase")
const { DeleteDeviceByIPAddressController } = require("../../controller/device/deleteDeviceByIPAddressController")
const { GetAllDevicesByIPAddressUseCase } = require("../../../application/useCase/device/getAllDevicesByIPAddressUseCase")
const { GetAllDevicesByIPAddressController } = require("../../controller/device/getAllDevicesByIPAddressController")
const { UpdateDeviceByIdUseCase } = require("../../../application/useCase/device/updateDeviceByIdUseCase")
const { UpdateDeviceByIdController } = require("../../controller/device/updateDeviceByIdController")

const deviceRepository = new DeviceRepository()

const createDeviceUseCase = new CreateDeviceUseCase(deviceRepository)
const createDeviceController = new CreateDeviceController(createDeviceUseCase)

const getAllDevicesUseCase = new GetAllDevicesUseCase(deviceRepository)
const getAllDevicesController = new GetAllDevicesController(getAllDevicesUseCase)

const getDeviceByIPAddressUseCase = new GetDeviceByIPAddressUseCase(deviceRepository)
const getDeviceByIPAddressController = new GetDeviceByIPAddressController(getDeviceByIPAddressUseCase)

const deleteDeviceByIPAddressUseCase = new DeleteDeviceByIPAddressUseCase(deviceRepository)
const deleteDeviceByIPAddressController = new DeleteDeviceByIPAddressController(deleteDeviceByIPAddressUseCase)

const getAllDevicesByIPAddressUseCase = new GetAllDevicesByIPAddressUseCase(deviceRepository)
const getAllDevicesByIPAddressController = new GetAllDevicesByIPAddressController(getAllDevicesByIPAddressUseCase)

const updateDeviceByIdUseCase = new UpdateDeviceByIdUseCase(deviceRepository)
const updateDeviceByIdController = new UpdateDeviceByIdController(updateDeviceByIdUseCase)

module.exports = {
    createDeviceController,  // Exportamos el controlador para ser utilizado en el router
    getAllDevicesController,
    getDeviceByIPAddressController,
    deleteDeviceByIPAddressController,
    getAllDevicesByIPAddressController,
    updateDeviceByIdController,
}