const { IpAdresses } = require("../entity/ipAddress")

class IPAddressesInterface{

    /**
     * @returns {Promise<Array<IpAdresses|String>|String|null>}
     */
    async getAllIpAddresses(){
        throw new Error("getAllIpAddresses method not implemented in IPAddresses interface")
    }

    /**
     * @param {String} ip_address
     * @param {String} mask
     * @returns {Promise<String|null>}
     */
    async createIpAddress(ip_address, mask){
        throw new Error("createIpAddress method not implemented in IPAddresses interface")
    }

    /**
     * @returns {Promise<Array<String|IpAdresses>String|null>}
     */
    async getAllIpAddressesAvailable(){
        throw new Error("getAllIpAddresses Available method not implemented in IPAddresses interface")
    }

    /**
     * @param {String} ip_address
     * @returns {Promise<Boolean|String|null>}
     */
    async deleteIpAddress(ip_address){
        throw new Error("deleteIpAddress method not implemented in IPAddresses interface")
    }

    /**
     * @param {String|Array<String>} ip_addresses
     * @param {Number} ip_group_id}
     * @returns {Promise<String>}
     */
    async addIpAddressInGroup(ip_addresses, ip_group_id) {
        throw new Error("addIpAddressInGroup method not implemented in IPAddresses interface")
    }
}

module.exports = IPAddressesInterface;