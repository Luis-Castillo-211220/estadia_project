const UserInterface = require('../../../domain/port/userInterface')

class ChangeUserRoleUseCase{
    constructor(userInterface = new UserInterface()){
        this.userInterface = userInterface
    }

    /**
     * @param {String} email
     * @param {String} newRole
     * @returns {Promise<Boolean|String>}
     */
    async run(email, newRole){
        try{
            const result = await this.userInterface.changeUserRole(email, newRole)
            return result
        }catch(err){
            console.error('Error al cambiar el rol del usuario', err)
            return false
        }
    }
}

module.exports = {  ChangeUserRoleUseCase }