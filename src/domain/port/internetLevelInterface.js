const { InternetLevel } = require("../entity/internetLevel")

class InternetLevelInterface{

    /**
     * @param {String} name
     * @param {String|null} description
     * @param {String|null} allowed_services
     * @param {String} allowed_timeframe
     * @param {Number} bandwidth_limit
     * @param {Number} priority
     * @returns {Promise<InternetLevel|String>}
     */
    async createInternetLevel(name, description, allowed_services, allowed_timeframe, bandwidth_limit, priority){
        throw new Error("createInternetLevel method not implemented in InternetLevel interface")
    }

    /**
     * @param {String} internet_level_id
     * @returns {Promise<Boolean|String>}
     */
    async deleteInternetLevelById(internet_level_id){
        throw new Error("deleteInternetLevel method not implemented in InternetLevel interface")
    }

}

module.exports = InternetLevelInterface