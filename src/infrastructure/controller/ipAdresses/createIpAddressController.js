const { CreateIpAddressUseCase } = require("../../../application/useCase/ipAdresses/createIpAddressUseCase")

class CreateIpAddressController {
    constructor(createIpAddressUseCase = new CreateIpAddressUseCase){
        this.createIpAddressUseCase = createIpAddressUseCase
    }

    async run(req = Request, res = Response){
        try{
            const { ip_address, mask } = req.body
            const result = await this.createIpAddressUseCase.run(ip_address, mask)
            if(result.status === 'success'){
                res.status(201).json({
                    result
                })
            } else {
                res.status(400).json({
                    result
                })
            }
        }catch (e) {
            console.error(e)
            res.status(500).json({
                error: 'Internal Server Error'
            })
        }
    }
}

module.exports = {
    CreateIpAddressController,
}