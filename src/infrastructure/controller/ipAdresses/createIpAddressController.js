const { CreateIpAddressUseCase } = require("../../../application/useCase/ipAdresses/createIpAddressUseCase")

class CreateIpAddressController {
    constructor(createIpAddressUseCase = new CreateIpAddressUseCase){
        this.createIpAddressUseCase = createIpAddressUseCase
    }

    async run(req = Request, res = Response){
        try{
            const { ip_address, mask } = req.body
            const ipAddress = await this.createIpAddressUseCase.run(ip_address, mask)

            if(ipAddress.status === 'success'){
                res.status(201).json({
                    ipAddress
                })
            } else {
                res.status(400).json({
                    ipAddress
                })
            }
        }catch (e) {
            res.status(500).json({
                error: e.message
            })
            console.error(e)
        }
    }
}

module.exports = {
    CreateIpAddressController,
}