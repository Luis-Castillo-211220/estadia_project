const { GetAllIpAdressesUseCase } = require("../../../application/useCase/ipAdresses/getAllIpAdressesUseCase")

class GetAllIpAdressesController{
    constructor(getAllIpAdressesUseCase = new GetAllIpAdressesUseCase){
        this.getAllIpAdressesUseCase = getAllIpAdressesUseCase
    }

    async run(req = Request, res = Response){
        try{
            const ipAdresses = await this.getAllIpAdressesUseCase.run()
            if(ipAdresses){
                res.status(200).json({
                    ipAdresses
                })
            }else{
                res.status(404).json({
                    message: 'No IP addresses found'
                })
            }
        }catch(e){
            res.status(500).json({
                error: e.message
            });
        }
    }

}

module.exports = { GetAllIpAdressesController }