const { getAllDevicesUseCase } = require("../../../application/useCase/device/getAllDevicesUseCase")
const { Device } = require("../../../domain/entity/device")

class GetAllDevicesController{
    constructor(getAllDeviceUseCase = new getAllDevicesUseCase){
        this.getAllDeviceUseCase = getAllDeviceUseCase
    }

    async run(req = Request, res = Response) {
        try{
            const devices = await this.getAllDeviceUseCase.run();
            if(devices){
                res.status(200).json({
                    devices
                });
            }else{
                res.status(400).json({
                    error: "Error al obtener los dispositivos"
                });
            }
        }catch(err){
            res.status(500).json({
                error: "Internal Server Error"
            });
            console.error(err);
        }
    }
}

module.exports = { GetAllDevicesController };