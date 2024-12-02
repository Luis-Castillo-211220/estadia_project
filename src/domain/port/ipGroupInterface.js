const { IpGroup } = require('../entity/ipGroup')

class IPGroupInterface{

    /**
     * @return {Promise<Array<IpGroup|String>|null>}
     */
    async getAllIPGroups(){
        throw new Error('getAllIPGroups method not implemented in IPGroupInterface')
    }

}

module.exports = IPGroupInterface;