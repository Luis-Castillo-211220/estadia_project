const { CreateDeviceUseCase } = require("../../../application/useCase/device/createDeviceUseCase")
const { Device } = require("../../../domain/entity/device")

class CreateDeviceController {
    constructor(createDeviceUseCase = new CreateDeviceUseCase) {
        this.createDeviceUseCase = createDeviceUseCase
    }

    async run(req = Request, res = Response) {
        try {
            const {ip_address_id} = req.body.ip_address
            const {owner_name, device_type, brand, model, serial, patrimony, user_id, mac_address, ubication, internet_level, proxy, observations} = req.body
            // const { user_name } = req.params
            const createDevice = await this.createDeviceUseCase.run(ip_address_id, owner_name, device_type, brand, model, serial, patrimony, user_id, mac_address, ubication, internet_level, proxy, observations)
            
            if (createDevice.status === 'success') {
                res.status(201).json({
                    createDevice
                })
            } else {
                res.status(400).json({ 
                    createDevice
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