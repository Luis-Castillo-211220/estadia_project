const HistoryInterface = require("../../../domain/port/historyInterface")

class GetHistoryByDateUseCase{
    constructor(historyInterface = new HistoryInterface()){
        this.historyInterface = historyInterface
    } 

    /**
     * @param {String} startDate
     * @param {String} endDate
     * @returns {Promise<Array<History|String>|null|String>}
     */
    async run(startDate, endDate){
        try{
            const histories = await this.historyInterface.getHistoryByDate(startDate, endDate)
            return histories
        }catch(err){
            console.error('Error al obtener el historial por fecha use case', err)
            return null
        }
    }
}

module.exports = { GetHistoryByDateUseCase }