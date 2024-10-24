const DeviceInterface = require("../../../domain/port/deviceInterface")
const { Device } = require("../../../domain/entity/device")

class GetAllDevicesUseCase{
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }

    /**
     * @returns {Promise<Array<Device>|null>}
     */
    async run(){
        try{
            const devices = await this.deviceInterface.getAllDevices()
            return devices
        }catch(err){
            console.error('Error al obtener los dispositivos', err)
            return null
        }
    }
}

module.exports = { GetAllDevicesUseCase }