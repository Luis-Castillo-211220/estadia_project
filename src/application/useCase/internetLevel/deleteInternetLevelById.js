const InternetLevelInterface = require("../../../domain/port/internetLevelInterface")

class DeleteInternetLevelById{
    constructor(internetLevelInterface = new InternetLevelInterface()){
        this.internetLevelInterface = internetLevelInterface
    }

    /**
     * @param {Number} internet_level_id
     * @returns {Promise<Boolean|String>}
     */
    async run(internet_level_id){
        try{
            const result = await this.internetLevelInterface.deleteInternetLevelById(internet_level_id)
            return result
        } catch (error) {
            return null
        }
    }
}

module.exports = { DeleteInternetLevelById }