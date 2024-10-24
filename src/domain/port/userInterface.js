const { User } = require("../entity/user")

class UserInterface{

    /** 
     * @param {String} name
     * @param {String} email
     * @param {String} password
     * @param {Array<String>} roles 
     * @return {Promise<User|String>}
     */
    async createUser(name, email, password, roles){
        throw new Error("createUser method not implemented in User interface")
    }

    /**
     * @param {String} email
     * @param {String} password
     * @return {Promise<String|Boolean|User|null>}
     */
    async loginUser(email, password){
        throw new Error("authenticateUser method not implemented in User interface")
    }

    /**
     * @param {String} email
     * @return {Promise<Boolean|String>}
     */
    async logoutUser(){
        throw new Error("logoutUser method not implemented in User interface")
    }

    /**
     * @return {Promise<Array<User>|User|null>}
     */
    async getAllUsers(){
        throw new Error("getAllUsers method not implemented in User interface")
    }

    /**
     * @param {String} email
     * @return {Promise<Boolean|String>}
     */
    async deleteUserByEmail(email){
        throw new Error("deleteUserByEmail method not implemented in User interface")
    }

    // /**
    //  * @param {String} email
    //  * @param {String} newPassword
    //  * @return {Promise<Boolean|String>}
    //  */

    // async updateUserPassword(email, newPassword){
    //     throw new Error("updateUserPassword method not implemented in User interface")

    /**
     * @param {String} email
     * @param {String} newRol
     * @returns {Promise<Boolean|String>}
     */
    async changeUserRole(email, newRol){
        throw new Error("updateUserRole method not implemented in User interface")
    }
}

module.exports = UserInterface