const DeviceInterface = require("../../../domain/port/deviceInterface")

class UpdateDeviceByIdUseCase {
    constructor(deviceInterface = new DeviceInterface()){
        this.deviceInterface = deviceInterface
    }

    /**
     * @param {number} device_id
     * @param {string|null} ip_address
     * @param {string|null} owner_name
     * @param {string|null} ubication
     * @param {string|null} internet_level
     * @param {Array<string>|string|null} groups
     * @returns {Promise<String>}
     */
    async run(device_id, ip_address, owner_name, ubication, internet_level, groups) {
        try{
            const updatedDevice = await this.deviceInterface.updateDeviceById(device_id, ip_address, owner_name, ubication, internet_level, groups)
            return updatedDevice
        }catch(err){
            console.error(err)
            return {status: 'error', message: 'Error updating device' + err.message}
        }
    }
}

module.exports = { UpdateDeviceByIdUseCase }