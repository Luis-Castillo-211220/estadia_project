const { CreateInternetLevelUseCase } = require("../../../application/useCase/internetLevel/createInternetLevelUseCase")

class CreateInternetLevelController{
    constructor(createInternetLevelUseCase = new CreateInternetLevelUseCase){
        this.createInternetLevelUseCase = createInternetLevelUseCase
    }

    async run(req = Request, res = Response){
        try{
            const { name, description, allowed_services, allowed_timeframe, bandwidth_limit, priority } = req.body
            const result = await this.createInternetLevelUseCase.run(name, description, allowed_services, allowed_timeframe, bandwidth_limit, priority)

            if(result.status === "success") {
                res.status(201).json({
                    result
                })
            }else{
                res.status(400).json({
                    result
                })
            }
        }catch(err) {
            console.error(err)
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            })
        }
    }
}

module.exports = { CreateInternetLevelController }