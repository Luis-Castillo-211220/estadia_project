const { CreateUserUseCase } = require("../../../application/useCase/user/createUserUseCase")

class CreateUserController{
    constructor(createUserUseCase = new CreateUserUseCase){
        this.createUserUseCase = createUserUseCase
    }

    async run(req = Request, res = Response){
        try{
            const { name, email, password, roles } = req.body
            
            if(!password){
                return res.status(400).json({
                    error: "Debes proporcionar una contraseña"
                })
            }
            if(roles == 'admin'){
                return res.status(403).json({
                    error: "No puedes crear un administrador"
                })
            }
            
            const user = await this.createUserUseCase.run(name, email, password, roles)

            if(user.status === 'success'){
                res.status(201).json({
                    user
                })
            }else{
                res.status(400).json({
                    error: "Error al crear el usuario",
                    message: user.message
                })
            }
        }catch(err){
            res.status(500).json({
                error: "Internal Server Error",
                message: err.message
            })
            console.error(err)
        }
    }
}

module.exports = { CreateUserController }