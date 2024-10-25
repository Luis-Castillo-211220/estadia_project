const { CreateDeviceUseCase } = require("../../../application/useCase/device/createDeviceUseCase")
const { Device } = require("../../../domain/entity/device")

class CreateDeviceController {
    constructor(createDeviceUseCase = new CreateDeviceUseCase) {
        this.createDeviceUseCase = createDeviceUseCase
    }

    async run(req = Request, res = Response) {
        try {
            const {ip_address, mac_address, owner_name, ubication, internet_level, proxy, device_type, brand, model, serial, patrimony, observations, groups} = req.body
            const { user_name } = req.params
            const createDevice = await this.createDeviceUseCase.run(ip_address, mac_address, owner_name, ubication, internet_level, proxy, device_type, brand, model, serial, patrimony, observations, groups, user_name)
            
            if (createDevice) {
                res.status(201).json(createDevice)
            } else {
                res.status(400).json({ 
                    error: createDevice 
                })
            }
        }catch (err) {
            res.status(500).json({ 
                error: err.toString()
            })
            console.error(err)
        }
    }
}

module.exports = { CreateDeviceController };