const { AddIpAddressInGroupUseCase } = require('../../../application/useCase/ipAdresses/addIpAddressInGroupUseCase')

class AddIpAddressInGroupController {
    constructor(addIpAddressInGroupUseCase = new AddIpAddressInGroupUseCase){
        this.addIpAddressInGroupUseCase = addIpAddressInGroupUseCase
    }

    async run(req = Request, res = Response){
        try{
            const { ip_addresses, ip_group_id } = req.body
            
            const result = await this.addIpAddressInGroupUseCase.run(ip_addresses, ip_group_id)

            if(result.status === 'success'){
                res.status(200).json({
                    result
                })
            }else{
                res.status(400).json({
                    result
                })
            }

        }catch(err){
            res.status(500).json({
                message: 'Error en la ejecución del caso de uso',
                data: err.message
            })
        }
    }
}

module.exports = { AddIpAddressInGroupController }