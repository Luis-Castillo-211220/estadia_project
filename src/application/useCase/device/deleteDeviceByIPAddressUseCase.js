const DeviceInterface = require("../../../domain/port/deviceInterface")
const { Device } = require("../../../domain/entity/device")

class DeleteDeviceByIPAddressUseCase{
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }

    /**
     * @param {String} ip_address
     * @return {Promise<Boolean|String>}
     */
    async run(ip_address){
        
        try{
            const result =  await this.deviceInterface.deleteDeviceByIPAddress(ip_address)
            return result;
        }catch(err){    
            console.error(err)
            return null
        }
        

    }
}

module.exports = { DeleteDeviceByIPAddressUseCase }