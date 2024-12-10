const DeviceInterface = require("../../../domain/port/deviceInterface")
const { Device } = require("../../../domain/entity/device")

class CreateDeviceUseCase{
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }

    /**
     * @param {String} ip_address_id
     * @param {String} owner_name
     * @param {String} device_type
     * @param {String} brand
     * @param {String} model
     * @param {String} serial
     * @param {String} patrimony
     * @param {Number} user_id
     * @param {String} mac_address
     * @param {String} ubication
     * @param {Number} internet_level_id
     * @param {Number} ip_group_id
     * @param {String} proxy
     * @param {String} observations
     * @returns {Promise<String|null>}
     */
    async run(ip_address_id, owner_name, device_type, brand, model, serial, patrimony, user_id, mac_address, ubication, internet_level_id, ip_group_id, proxy, observations){
        try{
            const newDevice = await this.deviceInterface.createDevice(ip_address_id, owner_name, device_type, brand, model, serial, patrimony, user_id, mac_address, ubication, internet_level_id, ip_group_id, proxy, observations)
            if (newDevice){
                return newDevice
            }else{
                return null
                throw new Error('Error al crear el dispositivo, in use case')
            }
        }catch(e){
            throw new Error(e.message)
        }
    }
}

module.exports = { CreateDeviceUseCase }