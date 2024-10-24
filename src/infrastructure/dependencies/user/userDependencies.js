const { UserRepository } = require("../../repository/user/postgresqlRepository")

const { CreateUserUseCase } = require("../../../application/useCase/user/createUserUseCase")
const { CreateUserController } = require(".././../controller/user/createUserController")
const { LoginUserUseCase } = require("../../../application/useCase/user/loginUserUseCase")
const { LoginUserController } = require("../../controller/user/loginUserController")
const { LogoutUserUseCase } = require("../../../application/useCase/user/logoutUserUseCase")
const { LoggoutUserController } = require("../../controller/user/loggoutUserController")
const { GetAllUsersUseCase } = require("../../../application/useCase/user/getAllUsersUseCase")
const { GetAllUsersController } = require("../../controller/user/getAllUsersController")
const { DeleteUserByEmailUseCase } = require("../../../application/useCase/user/deleteUserByEmailUseCase")
const { DeleteUserByEmailController } = require("../../controller/user/deleteUserByEmailController")
const { ChangeUserRoleUseCase } = require("../../../application/useCase/user/changeUserRoleUseCase")
const { ChangeUserRoleController } = require("../../controller/user/changeUserRoleController")


const userRepository = new UserRepository()

const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)

const loginUserUseCase = new LoginUserUseCase(userRepository)
const loginUserController = new LoginUserController(loginUserUseCase)

const logoutUserUseCase = new LogoutUserUseCase(userRepository)
const logoutUserController = new LoggoutUserController(logoutUserUseCase)

const getAllUsersUseCase =  new GetAllUsersUseCase(userRepository)
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

const deleteUserByEmailUseCase = new DeleteUserByEmailUseCase(userRepository)
const deleteUserByEmailController = new DeleteUserByEmailController(deleteUserByEmailUseCase)

const changeUserRoleUseCase = new ChangeUserRoleUseCase(userRepository)
const changeUserRoleController = new ChangeUserRoleController(changeUserRoleUseCase)

module.exports = { 
    createUserController,
    loginUserController,
    logoutUserController,
    getAllUsersController,
    deleteUserByEmailController,
    changeUserRoleController
}