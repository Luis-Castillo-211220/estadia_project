const { DeleteIpAddressUseCase } = require("../../../application/useCase/ipAdresses/deleteIpAddressUseCase")

class DeleteIpAddressController {
    constructor(deleteIpAddressUseCase = new DeleteIpAddressUseCase){
        this.deleteIpAddressUseCase = deleteIpAddressUseCase
    }

    async run(req = Request, res = Response){
        try{
            const ip_address = req.params.ip_address
            const result = await this.deleteIpAddressUseCase.run(ip_address)

            if(result.status === "success"){
                res.status(200).json({
                    message: "Dirección IP eliminada exitosamente"
                })
            }else{
                res.status(400).json({
                    result
                })
            }
        }catch(err){
            res.status(500).json({
                error: "Error al eliminar la dirección IP"
            })
        }    
    }
}

module.exports = { DeleteIpAddressController }