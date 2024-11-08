const IPAddressesInterface = require("../../../domain/port/ipAddressesInterface")

class CreateIpAddressUseCase{
    constructor(ipAddressesInterface = new IPAddressesInterface()){
        this.ipAddressesInterface = ipAddressesInterface
    }

    /**
     * @param {String} ip_address
     * @returns {Promise<String|null>}
     */
    async run(ip_address){
        try{
            const result = await this.ipAddressesInterface.createIpAddress(ip_address)
            return result
        }catch(e){
            console.error('Error al crear dirección IP use case', e)
            return null
        }
    }
}

module.exports = { CreateIpAddressUseCase }