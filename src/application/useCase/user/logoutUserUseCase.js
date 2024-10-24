const UserInterface =  require("../../../domain/port/userInterface")

class LogoutUserUseCase{
    constructor(userInterface = new UserInterface()){
        this.userInterface = userInterface
    }

    /**
     * @param {String} email
     * @returns {Promise<Boolean|String>}
     */
    async run(email){
        try{
            const result = await this.userInterface.logoutUser(email)
            return result
        }catch(e){
            console.error('Error al cerrar sesión use case', e)
            return false
        }
    }
}

module.exports = { LogoutUserUseCase }