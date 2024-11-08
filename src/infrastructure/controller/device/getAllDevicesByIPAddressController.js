const { GetAllDevicesByIPAddressUseCase } = require("../../../application/useCase/device/getAllDevicesByIPAddressUseCase")

class GetAllDevicesByIPAddressController {
    constructor(getAllDevicesByIPAddressUseCase = new GetAllDevicesByIPAddressUseCase) {
        this.getAllDevicesByIPAddressUseCase = getAllDevicesByIPAddressUseCase
    }

    async run(req = Request, res = Response){
        try{
            const ip_address = req.params.ip_address
            const devices = await this.getAllDevicesByIPAddressUseCase.run(ip_address)
            if(devices.status === 'success'){
                res.status(200).json({
                    devices
                });
            }else{
                res.status(400).json({
                    devices
                });
            }
        }catch(e){
            res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
            console.error(e);
        }
    } 
}

module.exports = { GetAllDevicesByIPAddressController }