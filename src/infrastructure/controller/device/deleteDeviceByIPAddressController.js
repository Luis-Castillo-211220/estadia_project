const { DeleteDeviceByIPAddressUseCase } = require("../../../application/useCase/device/deleteDeviceByIPAddressUseCase")

class DeleteDeviceByIPAddressController{
    constructor(deleteDeviceByIPAddress = new DeleteDeviceByIPAddressUseCase){
        this.deleteDeviceByIPAddressUseCase = deleteDeviceByIPAddress
    }

    async run(req = Request, res = Response){
        try{
            const ip_address = req.params.ip_address
            const result = await this.deleteDeviceByIPAddressUseCase.run(ip_address)
            if(result.status === "success"){
                res.status(200).json({
                    message: "Dispositivo eliminado exitosamente"
                })
            }else if(result.status === "error"){
                    res.status(400).json({
                        error: "Error al eliminar el dispositivo"
                    })
                }else{
                    res.status(400).json({
                        error: "Device not found"
                    })
                }
        } catch(error){
            res.status(500).json({
                error: error.message
            })
        }
    }
}

module.exports = { DeleteDeviceByIPAddressController }