require('dotenv').config()

module.exports = {
    host: process.env.IP_FORTIGATE,
    port: process.env.PORT_FORTIGATE,
    username: process.env.USER_FORTIGATE,
    password: process.env.PASSWORD_FORTIGATE,
}