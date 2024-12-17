const { User } = require("../entity/user")
const { History } = require("../entity/history")
const { Device } = require("../entity/device")
const { IpAdresses } = require("../entity/ipAddress")
const { InternetLevel } = require("../entity/internetLevel")
const { IpGroup } = require("../entity/ipGroup")

module.exports = () => {
    
    // User -> History
    User.hasMany(History, {
        foreignKey: "user_id"
    });

    History.belongsTo(User, {
        foreignKey: "user_id"
    });

    //User -> Devices
    User.hasMany(Device, {
        foreignKey: "user_id"
    })

    Device.belongsTo(User, {
        foreignKey: "user_id"
    })

    //Device -> Ip addresses
    IpAdresses.hasOne(Device, {
        foreignKey: "ip_address_id"
    })
    
    Device.belongsTo(IpAdresses, {  
        foreignKey: "ip_address_id" 
    })

    InternetLevel.hasMany(IpAdresses, {
        foreignKey: "internet_level_id",
        onDelete: "SET NULL"
    })

    IpAdresses.belongsTo(InternetLevel, {
        foreignKey: "internet_level_id",
        onDelete: "SET NULL"
    })

    IpGroup.hasMany(IpAdresses, {
        foreignKey: "ip_group_id",
    })

    IpAdresses.belongsTo(IpGroup, {
        foreignKey: "ip_group_id",
    })

    InternetLevel.hasOne(IpGroup, {
        foreignKey: "internet_level_id",
        onDelete: "SET NULL"
    })

    IpGroup.belongsTo(InternetLevel, {
        foreignKey: "internet_level_id",
        onDelete: "SET NULL"
    })
}