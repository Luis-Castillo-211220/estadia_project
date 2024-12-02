const IPGroupInterface = require('../../../domain/port/ipGroupInterface')
const { IpGroup } = require('../../../domain/entity/ipGroup')


class IpGroupRepository extends IPGroupInterface {

    async getAllIPGroups(){
        try{
            const result = await IpGroup.findAll()

            if(result.length === 0){
                return {status: 'error', message: 'No IP groups found'}
            }

            return {status: 'success', message: 'IP groups found', data: result}
        }catch(e){
            console.error('Error retrieving IP groups:', e)
            return null
        }
    }

}

module.exports = { IpGroupRepository }