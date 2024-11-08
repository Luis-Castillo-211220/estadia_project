const IPAddressesInterface = require("../../../domain/port/ipAddressesInterface")
const { IpAdresses } = require("../../../domain/entity/ipAddress")

class GetAllIpAdressesUseCase{
    constructor(ipAddressesInterface = new IPAddressesInterface()){
        this.ipAddressesInterface = ipAddressesInterface
    }

    /**
     * @returns {Promise<Array<IpAdresses|String>|null>}
     */
    async run(){
        try{
            const ipAddresses = await this.ipAddressesInterface.getAllIpAddresses()
            return ipAddresses
        }catch(e){
            console.error('Error al obtener todas las direcciones IP', e)
            return null
        }
    }
}

module.exports = { GetAllIpAdressesUseCase }