const { GetAllHistoryUseCase } = require("../../../application/useCase/history/getAllHistoryUseCase")

class GetAllHistoryController {
    constructor(getAllHistoryUseCase = new GetAllHistoryUseCase) {
        this.getAllHistoryUseCase = getAllHistoryUseCase
    }

    async run(req= Request, res = Response){
        try{
            const history = await this.getAllHistoryUseCase.run()
            if(history){
                res.status(200).json({
                    history
                })
            }else{
                res.status(404).json({
                    error: "No se encontraron historias"
                })
            }
        }catch(e){
            res.status(500).json({
                error: e.message
            });
        }
    } 
}

module.exports = { GetAllHistoryController }