const { GetAllUsersUseCase } = require('../../../application/useCase/user/getAllUsersUseCase')

class GetAllUsersController{
    constructor(getAllUsersUseCase = new GetAllUsersUseCase){
        this.getAllUsersUseCase = getAllUsersUseCase
    }

    async run(req = Request, res = Response){
        try{
            const users = await this.getAllUsersUseCase.run()
            if(users){
                res.status(200).json({
                    users
                })
            } else {
                res.status(404).json({
                    message: 'No users found'
                })
            }
        } catch(error){
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
            console.error(error)
        }
    }
}

module.exports = { GetAllUsersController }