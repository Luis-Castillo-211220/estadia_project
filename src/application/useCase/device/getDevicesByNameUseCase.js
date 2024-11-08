const DeviceInterface = require("../../../domain/port/deviceInterface")

class GetDevicesByNameUseCase{
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }


    /**
     * @param {String} owner_name
     * @returns {Promise<Array<Device|String>|String|null>}
     */
    async run(owner_name){
        try{
            const devices = await this.deviceInterface.getDevicesByName(owner_name)
            return devices
        } catch(error){
            return null
        }
    }
}

module.exports = { GetDevicesByNameUseCase }