const { LogoutUserUseCase } = require("../../../application/useCase/user/logoutUserUseCase")

class LoggoutUserController {
    constructor(logoutUserUseCase = new LogoutUserUseCase) {
        this.logoutUserUseCase = logoutUserUseCase
    }

    async run(req = Request, res = Response) {
        try{
            const email = req.body.email
            const result = await this.logoutUserUseCase.run(email)
            if(result){
                res.status(200).json({
                    status: 'success',
                    message: "User logged out successfully"
                })
            }else{
                res.status(404).json({
                    status: "error",
                    message: "User not found"
                })
            }
        }catch(err){
            res.status(500).json({
                error: err.message
            })
            console.error(err)
        }
    }
}

module.exports = {
    LoggoutUserController
};