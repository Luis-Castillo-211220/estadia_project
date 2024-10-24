const UserInterface = require('../../../domain/port/userInterface')

class DeleteUserByEmailUseCase{
    constructor(userInterface = new UserInterface()){
        this.userInterface = userInterface
    }

    /**
     * @param {String} email
     * @returns {Promise<Boolean|String>}
     */
    async run(email){
        try{
            const result = await this.userInterface.deleteUserByEmail(email)
            return result
        }catch(err){
            console.error('Error al eliminar el usuario', err)
            return false
        }
    }
}

module.exports = { DeleteUserByEmailUseCase }