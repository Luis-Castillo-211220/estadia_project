const DeviceInterface = require("../../../domain/port/deviceInterface")
const { Device } = require("../../../domain/entity/device")

class CreateDeviceUseCase{
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }

    /**
     * @param {String} ip_address
     * @param {String} mac_address
     * @param {String} owner_name
     * @param {String} ubication
     * @param {String} internet_level
     * @param {String} proxy
     * @param {String} device_type
     * @param {String} brand
     * @param {String} model
     * @param {String} serial
     * @param {String} patrimony
     * @param {String} observations
     * @param {Array<String>|null} groups
     */
    async run(ip_address, mac_address, owner_name, ubication, internet_level, proxy, device_type, brand, model, serial, patrimony, observations, groups){
        try{
            const newDevice = await this.deviceInterface.createDevice(ip_address, mac_address, owner_name, ubication, internet_level, proxy, device_type, brand, model, serial, patrimony, observations, groups)
            if (newDevice){
                return newDevice
            }else{
                throw new Error('Error al crear el dispositivo, in use case')
            }
        }catch(e){
            throw new Error(e.message)
        }
    }
}

module.exports = { CreateDeviceUseCase }