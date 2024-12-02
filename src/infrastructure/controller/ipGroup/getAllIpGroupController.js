const { GetAllIpGroupUseCase } = require('../../../application/useCase/ipGroup/getAllIpGroupUseCase')

class GetAllIpGroupController {

    constructor(getAllIpGroupUseCase = new GetAllIpGroupUseCase) {
        this.getAllIpGroupUseCase = getAllIpGroupUseCase
    }

    async run(req= Request, res = Response){
        try{
            const ipGroup = await this.getAllIpGroupUseCase.run()
            if(ipGroup.status === 'success'){
                res.status(200).json({
                    ipGroup
                })
            }else{
                res.status(404).json({
                    ipGroup
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