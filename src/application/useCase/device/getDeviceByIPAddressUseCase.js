const DeviceInterface = require("../../../domain/port/deviceInterface")
const { Device } = require("../../../domain/entity/device")

class GetDeviceByIPAddressUseCase{
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }

    /**
     * @param {String} ip_address
     * @returns {Promise<Device|null>}
     */
    async run(ip_address){
        try{
            const device = await this.deviceInterface.getDeviceByIPAddress(ip_address)
            if(!device) return null
            return device
        }catch(err){
            console.error('Error al obtener el dispositivo por IP', err)
            throw new Error('Error al obtener el dispositivo in use case',)
            return null
        }
    }
}

module.exports = { GetDeviceByIPAddressUseCase }