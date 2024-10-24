const HistoryInterface = require("../../../domain/port/historyInterface")

class GetHistoryByNameUseCase{
    constructor(historyInterface = new HistoryInterface()){
        this.historyInterface = historyInterface
    }

    /**
     * @param {String} user_name
     * @returns {Promise<Array<String>|null>}
     */
    async run(user_name){
        try{
            const history = await this.historyInterface.getHistoryByName(user_name)
            return history
        }catch(err){
            console.error('Error al obtener la historia del usuario', err)
            return null
        }
    }
}

module.exports = { GetHistoryByNameUseCase }