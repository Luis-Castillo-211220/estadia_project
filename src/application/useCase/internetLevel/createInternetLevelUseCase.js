const InternetLevelInterface = require("../../../domain/port/internetLevelInterface")

class CreateInternetLevelUseCase{
    constructor(internetLevelInterface = new InternetLevelInterface()){
        this.internetLevelInterface = internetLevelInterface
    }

    /**
     * @param {String} name
     * @param {String|null} description
     * @param {String|null} allowed_services
     * @param {String} allowed_timeframe
     * @param {Number} bandwidth_limit
     * @param {Number} priority
     * @returns {Promise<InternetLevel|String>}
     */
    async run(name, description, allowed_services, allowed_timeframe, bandwidth_limit, priority) {
        try{
            const internetLevel = await this.internetLevelInterface.createInternetLevel(name, description, allowed_services, allowed_timeframe, bandwidth_limit, priority)
            return internetLevel
        }catch(e){
            console.error('Error al crear el nivel de internet', e)
            return null
        }
    }
}

module.exports = { CreateInternetLevelUseCase }