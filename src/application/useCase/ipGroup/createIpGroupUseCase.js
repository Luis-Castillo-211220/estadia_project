const IPGroupInterface = require('../../../domain/port/ipGroupInterface')

class CreateIpGroupUseCase {
    constructor(ipGroupInterface = new IPGroupInterface()){
        this.ipGroupInterface = ipGroupInterface
    }

    async run(name, description){
        try{
            const ipGroup = this.ipGroupInterface.create(name, description)
        return ipGroup
        }catch(e){
            console.error('Error al crear el grupo de IP', e)
            return null
        }
    
    }
}

module.exports = { CreateIpGroupUseCase }