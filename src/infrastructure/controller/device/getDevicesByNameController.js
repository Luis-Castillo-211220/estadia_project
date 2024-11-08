const { GetDevicesByNameUseCase } = require("../../../application/useCase/device/getDevicesByNameUseCase")

class GetDevicesByNameController {
    constructor(getDevicesByNameUseCase = new GetDevicesByNameUseCase){
        this.getDevicesByNameUseCase = getDevicesByNameUseCase
    }

    async run(req = Request, res = Response){
        try{
            const owner_name = req.params.owner_name
            const devices = await this.getDevicesByNameUseCase.run(owner_name)
            if(devices != 0){
                res.status(200).json({
                    status: 'success',
                    devices: devices
                })
            }else{
                res.status(404).json({
                    status: 'error',
                    message: 'No devices found for this owner'
                })
            }
        }catch(err){
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        }
    }
}

module.exports = { GetDevicesByNameController }