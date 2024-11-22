const { DeleteInternetLevelByIdUseCase } = require("../../../application/useCase/internetLevel/deleteInternetLevelByIdUseCase")

class DeleteInternetLevelByIdController {
    constructor(deleteInternetLevelByIdUseCase = new DeleteInternetLevelByIdUseCase){
        this.deleteInternetLevelByIdUseCase = deleteInternetLevelByIdUseCase
    }
    
    async run(req = Request, res = Response){
        try{
            const internetLevelId = req.params.internet_level_id
            const result = await this.deleteInternetLevelByIdUseCase.run(internetLevelId)

            if(result.status === "success"){
                res.status(200).json({
                    message: "Internet level deleted successfully"
                })
            }else{
                res.status(404).json({
                    result
                })
            }
        }catch(e){
            res.status(500).json({
                msg: "Internal Server Error",
                error: e.message
            })
            console.error(e)
        }
    }

}

module.exports = { DeleteInternetLevelByIdController }