const IPGroupInterface = require('../../../domain/port/ipGroupInterface')

class ChangeInternetLevelGroupUseCase{
    constructor(iPGroupInterface = new IPGroupInterface()){
        this.iPGroupInterface = iPGroupInterface
    }

    /**
     * @param {Number} ip_group_id
     * @param {Number} new_internet_level_id
     */
    async run(ip_group_id, new_internet_level_id){
        try{
            const result = await this.iPGroupInterface.changeInternetLevelGroup(ip_group_id, new_internet_level_id)
            return result
        }catch(e){
            console.error('Error al cambiar el nivel de Internet en el grupo de IP', e)
            return null
        }
    }
}

module.exports = { ChangeInternetLevelGroupUseCase }