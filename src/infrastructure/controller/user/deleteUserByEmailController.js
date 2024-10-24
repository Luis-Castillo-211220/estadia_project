const { DeleteUserByEmailUseCase } = require("../../../application/useCase/user/deleteUserByEmailUseCase")

class DeleteUserByEmailController {
    constructor(deleteUserByEmailUseCase = new DeleteUserByEmailUseCase) {
        this.deleteUserByEmailUseCase = deleteUserByEmailUseCase
    }

    async run(req = Request, res = Response) {
        try{
            const email = req.params.email
            const result = await this.deleteUserByEmailUseCase.run(email)
            if(result){
                res.status(200).json({
                    message: "User deleted successfully"
                })
            }else{
                res.status(404).json({
                    error: "User not found"
                })
            }
        }catch(err){
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
            console.error(err)
        }
    }
}

module.exports = { DeleteUserByEmailController }