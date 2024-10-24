const { DataTypes } = require('sequelize')
// const { sequelize } = require('../../database/mysql')
const { sequelize } = require('../../database/sqlserver')
const bcrypt = require('bcrypt')

const User = sequelize.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                msg: 'La contraseña debe tener entre 8 y 15 caracteres, incluyendo al menos una letra mayúscula, una minúscula, un dígito y un carácter especial ($ @ ! % * ? &), sin espacios.',
            }
        }
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    roles: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
},{
    freezeTableName: true,
    hooks: {
        beforeCreate: (user, options) => {
            user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10): "";
        }
    }
})

module.exports = { User }