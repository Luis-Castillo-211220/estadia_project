require('dotenv').config()

module.exports = {
    host: process.env.IP_FORTIGATE,
    port: PORT_FORTIGATE,
    username: USER_FORTIGATE,
    password: process.env.PASSWORD_FORTIGATE,
}