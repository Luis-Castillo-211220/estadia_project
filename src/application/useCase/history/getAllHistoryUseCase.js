const { History } = require("../../../domain/entity/history")
const { HistoryInterface } = require("../../../domain/port/historyInterface")

class GetAllHistoryUseCase{
    constructor(historyInterface = new HistoryInterface()){
        this.historyInterface = historyInterface
    }
    /**
     * @returns {Promise<Array<History>|null>}
     */
    async run(){
        try{
            const history = await this.historyInterface.getAllHistory()
            return history
        }catch(err){
            console.error('Error al obtener la historia', err)
            return null
        }
    }
}

module.exports = { GetAllHistoryUseCase }