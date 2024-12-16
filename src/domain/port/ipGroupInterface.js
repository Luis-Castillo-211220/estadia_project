const { IpGroup } = require('../entity/ipGroup')

class IPGroupInterface{

    /**
     * @return {Promise<Array<IpGroup|String>|null>}
     */
    async getAllIPGroups(){
        throw new Error('getAllIPGroups method not implemented in IPGroupInterface')
    }

    /**
     * @param {String} name
     * @param {String} description
     * @param {Number} internet_level_id
     * @param {String|null} ip_address
     * @returns {Promise<boolean|string>}
     */
    async createIpGroup(name, description, internet_level_id, ip_address){
        throw new Error('createIpGroup method not implemented in IPGroupInterface')
    }

    /**
     * @param {Number} ip_group_id
     * @param {Number} new_internet_level_id
     * @returns {Promise<boolean|string>}
     */
    async changeInternetLevelGroup(ip_group_id, new_internet_level_id){
        throw new Error('updateIpGroupInternetLevel method not implemented in IPGroupInterface')
    }
}

module.exports = IPGroupInterface;