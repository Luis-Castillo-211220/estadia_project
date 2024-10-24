const { User } = require("../../../domain/entity/user")
const UserInterface = require("../../../domain/port/userInterface")
const bcrypt = require('bcrypt');   

class UserRepository extends UserInterface {

    async createUser(name, email, password, roles){
        try{

            const result = await User.findOne({ where: { email: email } })

            if(!result) return {status: 'error', message: 'User already exists'}

            const newUser = await User.create({
                name: name,
                email: email,
                password: password,
                roles: roles
                
            }, {
                fields: ["name", "email", "password", "roles"]
            })
            return {status: 'success', data: newUser}
        } catch (error) {
            return {status: 'error', message: error.message}
        }
    } 

    async loginUser(email, password){
        try{
            const user = await User.findOne({ where: { email: email } })
            if (!user){
                throw new Error("User not found")
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match){
                throw new Error("Incorrect password")
            }

            const updateUser = await user.update({
                last_login: new Date(),
                is_active: true,
            }, {
                where: {
                    email: user.email
                }
            })

            await updateUser.save();
            return updateUser;
            // return user;
        }catch(err){
            throw new Error("Error logging in user: " + err.message);
        }
    }

    async logoutUser(email){
        try{
            const user = await User.findOne({ where: { email: email } })
            if (!user){
                throw new Error("User not found")
            }
            const updateUser = await user.update({
                last_login: new Date(),
                is_active: false,
            }, {
                where: {
                    is_active: true
                }
            })
            await updateUser.save();
            return updateUser;
        }catch(err){
            throw new Error("Error logging out user: " + err.message);
        }
    }

    async getAllUsers(){
        try{
            const allUsers = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            return allUsers;
        } catch (error) {
            throw new Error("Error getting all users: " + error.message);
        }
    }

    async deleteUserByEmail(email){
        try{
            const user = await User.findOne({ where: { email: email } })
            if (!user){
                throw new Error("User not found")
            }
            await user.destroy();
            return "User deleted successfully";
        } catch (error) {
            throw new Error("Error deleting user: " + error.message);
        }
    }

    async changeUserRole(email, newRol){
        try{
            const user = await User.findOne({ where: { email: email } })
            if (!user){
                // throw new Error("User not found")
                return "User not found";
            }

            if(newRol != 'admin' && newRol != 'user'){
                // throw new Error("Invalid role")
                return "Invalid role";
            }

            const updateUser = await user.update({
                roles: newRol
            }, {
                where: {
                    email: user.email
                }
            })
            await updateUser.save();
            return 'success';
        } catch (error) {
            throw new Error("Error changing user role: " + error.message);
        }
    }
}

module.exports = { UserRepository };