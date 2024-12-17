const { ChangeInternetLevelGroupUseCase } = require('../../../application/useCase/ipGroup/changeInternetLevelGroupUseCase')

class ChangeInternetLevelGroupController{
    constructor(changeInternetLevelGroupUseCase = new ChangeInternetLevelGroupUseCase){
        this.changeInternetLevelGroupUseCase = changeInternetLevelGroupUseCase
    }

    async run( req = Request, res = Response){
        try{
            const { ip_group_id, new_internet_level_id } = req.body

            const result = await this.changeInternetLevelGroupUseCase.run(ip_group_id, new_internet_level_id)

            if(result.status ==='success'){
                res.status(200).json({
                    result
                })
            }else{
                res.status(400).json({
                    result
                })
            }

        }catch(e){
            res.status(500).json({
                error: e.message
            })
        }
    }
}

module.exports = { ChangeInternetLevelGroupController }