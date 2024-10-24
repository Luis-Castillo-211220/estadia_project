const { ChangeUserRoleUseCase } = require("../../../application/useCase/user/changeUserRoleUseCase")

class ChangeUserRoleController {
    constructor(changeUserRoleUseCase = new ChangeUserRoleUseCase){
        this.changeUserRoleUseCase = changeUserRoleUseCase
    }

    async run(req = Request, res = Response){
        try{
            const email = req.params.email
            const role = req.body.role
            const result = await this.changeUserRoleUseCase.run(email, role)

            if(result === 'success'){
                res.status(200).json({
                    message: "User role updated successfully"
                })
            }else{
                if(result === 'User not found'){
                    res.status(404).json({
                        error: "User not found"
                    })
                } else{
                    res.status(400).json({
                        error: "Invalid role"
                    })
                }
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

module.exports = { ChangeUserRoleController }