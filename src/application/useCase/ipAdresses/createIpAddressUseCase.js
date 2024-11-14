const IPAddressesInterface = require("../../../domain/port/ipAddressesInterface")

class CreateIpAddressUseCase{
    constructor(ipAddressesInterface = new IPAddressesInterface()){
        this.ipAddressesInterface = ipAddressesInterface
    }

    /**
     * @param {String} ip_address
     * @param {String} mask
     * @returns {Promise<String|null>}
     */
    async run(ip_address, mask){
        try{
            const result = await this.ipAddressesInterface.createIpAddress(ip_address, mask)
            return result
        }catch(e){
            console.error('Error al crear dirección IP use case', e)
            return null
        }
    }
}

module.exports = { CreateIpAddressUseCase }