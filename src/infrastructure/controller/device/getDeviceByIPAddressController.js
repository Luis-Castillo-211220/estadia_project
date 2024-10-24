const { GetDeviceByIPAddressUseCase } = require("../../../application/useCase/device/getDeviceByIPAddressUseCase")

class GetDeviceByIPAddressController{
    constructor(getDeviceByIPAddressUseCase = new GetDeviceByIPAddressUseCase){
        this.getDeviceByIPAddressUseCase = getDeviceByIPAddressUseCase
    }

    async run(req = Request, res = Response){
        try{
            const ip_address = req.params.ip_address
            const device = await this.getDeviceByIPAddressUseCase.run(ip_address)

            if(device){
                res.status(200).json({
                    device
                })
            }else{
                res.status(404).json({
                    status:  'ERROR',
                    message: 'Dispositivo no encontrado'
                })
            }
        }catch(err){
            res.status(500).json({
                status:  'ERROR',
                message: 'Error interno del servidor',
                err: err.toString()
            })
            console.error(err)
        }

    }
}

module.exports = { GetDeviceByIPAddressController }