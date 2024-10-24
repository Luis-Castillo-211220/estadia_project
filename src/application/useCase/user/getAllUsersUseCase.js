const UserInterface = require('../../../domain/port/userInterface')

class GetAllUsersUseCase{
    constructor(userInterface = new UserInterface()){
        this.userInterface = userInterface
    }

    /**
     * @returns {Promise<Array<Users>|User|null>}
     */
    async run(){
        try{
            const users = await this.userInterface.getAllUsers()
            return users
        }catch(err){
            console.error('Error al obtener todos los usuarios', err)
            return null
        }
    }
}

module.exports = { GetAllUsersUseCase }