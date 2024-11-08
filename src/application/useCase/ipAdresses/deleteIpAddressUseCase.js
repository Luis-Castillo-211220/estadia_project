const IpAddressesInterface = require("../../../domain/port/ipAddressesInterface")

class DeleteIpAddressUseCase{
    constructor(ipAddressesInterface = new IpAddressesInterface()){
        this.ipAddressesInterface = ipAddressesInterface
    }

    /**
     * @param {String} ip_address
     * @returns {Promise<Boolean|String|String>}
     */
    async run(ip_address){
        try{
            const result = await this.ipAddressesInterface.deleteIpAddress(ip_address)
            return result
        }catch(err){
            console.error('Error al eliminar la dirección IP use case', e)
            return null
        }
    }
}

module.exports = { DeleteIpAddressUseCase }