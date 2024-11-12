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
    async createInternetLevel(){
        throw new Error("createInternetLevel method not implemented in InternetLevel interface")
    }

}

module.exports = InternetLevelInterface