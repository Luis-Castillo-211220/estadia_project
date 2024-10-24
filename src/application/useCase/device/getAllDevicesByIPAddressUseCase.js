const DeviceInterface = require("../../../domain/port/deviceInterface")

class GetAllDevicesByIPAddressUseCase{
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }

    /**
     * @param {String} ip_address 
     */
    async run(ip_address){
        try{
            const devices = await this.deviceInterface.getAllDevicesByIPAddress(ip_address)
            if(devices){
                return devices
            }else{
                throw new Error("No devices found for the given IP address")
            }
        }catch(e){
            throw new Error(e.message)
        }
    }
}

module.exports = { GetAllDevicesByIPAddressUseCase }