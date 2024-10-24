const { LoginUserUseCase } = require("../../../application/useCase/user/loginUserUseCase")

class LoginUserController {
    constructor(loginUserUseCase = new LoginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase
    }

    async run(req = Request, res = Response) {
        try{
            const { email, password } = req.body
            const user = await this.loginUserUseCase.run(email, password)

            if(user){
                res.status(200).json({
                    status: 'success',
                    user_id: user.id,
                    email: user.email
                })
            } else {
                res.status(401).json({
                    error: "Credenciales incorrectas"
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