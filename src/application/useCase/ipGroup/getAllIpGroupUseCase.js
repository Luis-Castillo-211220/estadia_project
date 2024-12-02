const IPGroupInterface = require('../../../domain/port/ipGroupInterface')
const { IpGroup } = require('../../../domain/entity/ipGroup')

class GetAllIpGroupUseCase{
    constructor(iPGroupInterface = new IPGroupInterface()){
        this.iPGroupInterface = iPGroupInterface
    }

    /**
     * @returns {Promise<Array<IpGroup|String>|null>}
     */
    async run(){
        try{
            const ipGroup = await this.iPGroupInterface.getAllIPGroups()
            return ipGroup || null
        }catch(e){
            console.error('Error al obtener todas las grupos de IP', e)
            return null
        }
    }
}

module.exports = { GetAllIpGroupUseCase }