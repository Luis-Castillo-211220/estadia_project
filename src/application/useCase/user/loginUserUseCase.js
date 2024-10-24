const UserInterface = require('../../../domain/port/userInterface')
const { User } = require("../../../domain/entity/user")

class LoginUserUseCase{
    constructor(userInterface = new UserInterface()){
        this.userInterface = userInterface
    }

    /**
     * @param {String} email
     * @param {String} password
     * @returns {Promise<String|Boolean|User|null>}
     */
    async run(email, password){
        try{
            const user = await this.userInterface.loginUser(email, password)
            return user
        }catch(err){
            console.error('Error al iniciar sesión use case', err)
            return false
        }
    }
}

module.exports = { LoginUserUseCase }