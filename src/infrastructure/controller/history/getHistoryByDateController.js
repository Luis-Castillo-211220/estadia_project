const { GetHistoryByDateUseCase } = require("../../../application/useCase/history/getHistoryByDateUseCase")

class GetHistoryByDateController {
    constructor(getHistoryByDateUseCase = new GetHistoryByDateUseCase) {
        this.getHistoryByDateUseCase = getHistoryByDateUseCase
    }

    async run(req = Request, res = Response) {
        try{
            const { startDate, endDate } = req.body
            const result = await this.getHistoryByDateUseCase.run(startDate, endDate)
            
            //aqui se pudo hacer la evaluacion de las fechas y no en el repo xd

            if(result.status === 'success'){
                res.status(200).json({
                    result
                })
            }else{
                res.status(404).json({
                    error: result.message
                })
            }
        }catch(err){
            res.status(500).json({
                error: "Internal Server Error",
                message: err.message
            })
            console.error(err)
        }
    }
}

module.exports = { GetHistoryByDateController }