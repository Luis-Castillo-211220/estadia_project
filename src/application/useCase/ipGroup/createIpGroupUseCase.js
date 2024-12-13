const IPGroupInterface = require('../../../domain/port/ipGroupInterface')

class CreateIpGroupUseCase {
    constructor(ipGroupInterface = new IPGroupInterface()){
        this.ipGroupInterface = ipGroupInterface
    }

    /**
     * 
     * @param {String} name 
     * @param {String} description 
     * @param {Number} internet_Level_id 
     * @param {String|null} ip_address 
     * @returns {Promise<Boolean|String>}
     */
    async run(name, description, internet_level_id, ip_address){
        try{
            const ipGroup = await this.ipGroupInterface.createIpGroup(name, description, internet_level_id, ip_address)
            return ipGroup
        }catch(e){
            console.error('Error al crear el grupo de IP', e)
            return null
        }
    
    }
}

module.exports = { CreateIpGroupUseCase }