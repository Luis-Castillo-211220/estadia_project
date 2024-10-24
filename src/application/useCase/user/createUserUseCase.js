const UserInterface = require("../../../domain/port/userInterface")

class CreateUserUseCase{
    constructor(userInterface = new UserInterface()){
        this.userInterface = userInterface
    }

    /**
     * @param {String} name
     * @param {String} email
     * @param {String} password
     * @param {Array<String>} roles
     * @returns {Promise<User|String}
     */
    async run(name, email, password, roles){
        try{
            const user = await this.userInterface.createUser(name, email, password, roles)
            return user
        }catch(e){
            console.error('Error al crear el usuario', e)
            return `Error al crear el usuario: ${e.message}`
        }
    }
}

module.exports = { CreateUserUseCase }