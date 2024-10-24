const express = require('express')

const userRouter = express.Router()

const { 
    createUserController,
    loginUserController,
    logoutUserController,
    getAllUsersController,
    deleteUserByEmailController,
    changeUserRoleController
} = require("../dependencies/user/userDependencies")

userRouter.post('/register', createUserController.run.bind(createUserController)); //create
userRouter.post('/login', loginUserController.run.bind(loginUserController)); //login
userRouter.post('/logout', logoutUserController.run.bind(logoutUserController)) //log out
userRouter.get('/', getAllUsersController.run.bind(getAllUsersController)); // Get All Users
userRouter.delete('/destroy/:email', deleteUserByEmailController.run.bind(deleteUserByEmailController)); //Delete By Email
userRouter.put('/changeRole/:email', changeUserRoleController.run.bind(changeUserRoleController)); //Change User Role

module.exports = { userRouter };