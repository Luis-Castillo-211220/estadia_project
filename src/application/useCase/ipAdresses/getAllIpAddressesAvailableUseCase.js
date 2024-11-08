const IpAdressesInterface = require("../../../domain/port/ipAddressesInterface")
const { IpAdresses } = require("../../../domain/entity/ipAddress")

class GetAllIpAddressesAvailableUseCase{
    constructor(ipAdressesInterface = new IpAdressesInterface()){
        this.ipAddressesInterface = ipAdressesInterface
    }

    /**
     * @returns {Promise<Array<String|IpAdresses>|String|null>}
     */
    async run(){
        try{
            const ipAddresses = await this.ipAddressesInterface.getAllIpAddressesAvailable()
            return ipAddresses
        }catch(err){
            console.error('Error al obtener las direcciones IP disponibles', err)
            return null
        }
    }
}

module.exports = { GetAllIpAddressesAvailableUseCase }