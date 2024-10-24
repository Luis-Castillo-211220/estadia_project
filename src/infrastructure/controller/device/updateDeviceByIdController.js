const { UpdateDeviceByIdUseCase } = require("../../../application/useCase/device/updateDeviceByIdUseCase")

class UpdateDeviceByIdController {
    constructor(updateDeviceByIdUseCase = new UpdateDeviceByIdUseCase){
        this.updateDeviceByIdUseCase = updateDeviceByIdUseCase
    }

    async run(req= Request, res= Response){
        try{
            const device_id = req.params.device_id
            const { ip_address, owner_name, ubication, internet_level, groups } = req.body
            const result = await this.updateDeviceByIdUseCase.run(device_id, ip_address, owner_name, ubication, internet_level, groups)

            if(result.status === 'success'){
                res.status(200).json({
                    status: result.status,
                    message: result.message
                })
            }else{
                res.status(404).json({
                    status: result.status,
                    message: result.message
                })
            }
        }catch(err){
            res.status(500).json({
                error: 'Internal Server Error',
                message: err.message
            })
            console.error(err)
        }
    }
}

module.exports = { UpdateDeviceByIdController }