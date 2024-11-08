const { LoginUserUseCase } = require("../../../application/useCase/user/loginUserUseCase")

class LoginUserController {
    constructor(loginUserUseCase = new LoginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase
    }

    async run(req = Request, res = Response) {
        try{
            const { email, password } = req.body
            const user = await this.loginUserUseCase.run(email, password)

            if(user.status === 'success'){
                res.status(200).json({
                    user
                })
            } else {
                res.status(401).json({
                    status: user.status,
                    message: user.message
                })
            }
        }catch(err){
            res.status(500).json({
                error: "Error interno del servidor",
                message: err.message
            })
        }
    }
}

module.exports = { LoginUserController }