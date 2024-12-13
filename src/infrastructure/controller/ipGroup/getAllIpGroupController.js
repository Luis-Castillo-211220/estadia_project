const { GetAllIpGroupUseCase } = require('../../../application/useCase/ipGroup/getAllIpGroupUseCase')

class GetAllIpGroupController {

    constructor(getAllIpGroupUseCase = new GetAllIpGroupUseCase) {
        this.getAllIpGroupUseCase = getAllIpGroupUseCase
    }

    async run(req= Request, res = Response){
        try{
            const result = await this.getAllIpGroupUseCase.run()
            if(result.status === 'success'){
                res.status(200).json({
                    result
                })
            }else{
                res.status(404).json({
                    result
                })
            }
        } catch(error){
            console.error(error)
            res.status(500).json({
                message: 'Error getting ip group'
            })
        }
    }

}   

module.exports = { GetAllIpGroupController }