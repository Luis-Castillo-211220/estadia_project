const { GetHistoryByNameUseCase } = require("../../../application/useCase/history/getHistoryByNameUseCase")

class GetHistoryByNameController{
    constructor(getHistoryByNameUseCase = new GetHistoryByNameUseCase){
        this.getHistoryByNameUseCase = getHistoryByNameUseCase
    }

    async run(req = Request, res = Response){
        try{
            const user_name = req.params.user_name //req.body.user_name
            const histories = await this.getHistoryByNameUseCase.run(user_name)
            if(histories){
                res.status(200).json({
                    histories
                })  
            }else{
                res.status(404).json({
                    error: "No se encontraron historias con el nombre de usuario"
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

module.exports = { GetHistoryByNameController }