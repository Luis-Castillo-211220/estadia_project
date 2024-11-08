const { GetAllIpAddressesAvailableUseCase } = require("../../../application/useCase/ipAdresses/getAllIpAddressesAvailableUseCase")

class GetAllIpAddressesAvailableController{
    constructor(getAllIpAddressesAvailableUseCase = new GetAllIpAddressesAvailableUseCase){
        this.getAllIpAddressesAvailableUseCase = getAllIpAddressesAvailableUseCase
    }

    async run(req = Request, res = Response){
        try{
            const ipAddressesAvailable = await this.getAllIpAddressesAvailableUseCase.run()
            if(ipAddressesAvailable){
                res.status(200).json({
                    ipAddressesAvailable
                })
            }else{
                res.status(404).json({
                    message: 'No IP addresses available'
                })
            }
        } catch (error){
            res.status(500).json({
                message: error.message
            })
        }
    }
}

module.exports = { GetAllIpAddressesAvailableController }