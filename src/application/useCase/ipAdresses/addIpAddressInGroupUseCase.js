const IPAddressesInterface = require('../../../domain/port/ipAddressesInterface')

class AddIpAddressInGroupUseCase {
    constructor(iPAddressesInterface = new IPAddressesInterface()){
        this.iPAddressesInterface = iPAddressesInterface
    }

    /**
     * @param {String} ip_addresses
     * @param {String} ip_group_id
     * @returns {Promise<boolean|String>}
     */
    async run(){
        try{
            const result = await this.iPAddressesInterface.addIpAddressInGroup(ip_addresses, ip_group_id);
            return result
        }catch(err){    
            console.error('Error al agregar dirección IP a grupo', err)
            return null
        }
    }
}

module.exports = { AddIpAddressInGroupUseCase }