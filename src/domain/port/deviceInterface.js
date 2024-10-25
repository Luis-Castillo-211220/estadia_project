const { Device } = require('../entity/device')

class DeviceInterface{
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
     * @param {String} user_name
     * @returns {Promise<String|null>}
     */
    async createDevice(ip_address, mac_address, owner_name, ubication, internet_level, proxy, device_type, brand, model,
        serial, patrimony, observations, groups, user_name){
        throw new Error("create method not implemented in Device interface")
    }

    /**
     * @returns {Promise<Array<Device>|null>}
     */
    async getAllDevices() {
        throw new Error("getAllDevices method not implemented in Device interface")
    }

    /**
     * 
     * @param {String} ip_address
     * @returns {Promise<Device|null|String>}
     */
    async getDeviceByIPAddress(ip_address) {
        throw new Error("getById method not implemented in Device interface")
    }

    /**
     * @param {String} ip_address
     * @returns {Promise<Boolean|String>}
     */
    async deleteDeviceByIPAddress(){
        throw new Error("delete method not implemented in Device interface")
    }

    /** 
     * @param {String} ip_address
     * @returns {Promise<Array<Device>|Device|null>}
     */
    async getAllDevicesByIPAddress(ip_address){
        throw new Error("getDevicesByIPAddress method not implemented in Device interface")
    }

    /**
     * @param {number} device_id
     * @param {string|null} ip_address
     * @param {string|null} owner_name
     * @param {string|null} ubication
     * @param {string|null} internet_level
     * @param {Array<String>|null} groups
     * @returns {Promise<String>}
     */
    async updateDeviceById(device_id, ip_address, owner_name, internet_level, groups) {
        throw new Error("update method not implemented in Device interface")
    }
}


module.exports = DeviceInterface;