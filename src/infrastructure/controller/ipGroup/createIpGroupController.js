const { CreateIpGroupUseCase } = require('../../../application/useCase/ipGroup/createIpGroupUseCase')

class CreateIpGroupController{
    constructor(createIpGroupUseCase = new CreateIpGroupUseCase){
        this.createIpGroupUseCase = createIpGroupUseCase
    }

    async run(req = Request, res = Response){
        try{
            const { name, description, internet_level_id, ip_address} = req.body
            const result = await this.createIpGroupUseCase.run(name, description, internet_level_id, ip_address)

            if(result.status ==='success'){
                res.status(201).json({
                    result
                })
            }else{
                res.status(400).json({
                    result
                })
            }
        } catch(error){
            console.error(error)
            res.status(500).json({
                error: 'Internal Server Error'
            })
        }
    }
}

module.exports = {
    CreateIpGroupController
}