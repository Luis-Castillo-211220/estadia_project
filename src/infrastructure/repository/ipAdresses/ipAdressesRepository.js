const IpAdressesInterface = require("../../../domain/port/ipAddressesInterface")
const { IpAdresses } = require("../../../domain/entity/ipAddress")

const sequelize = require("sequelize")

class IpAdressesRepository extends IpAdressesInterface{

    async getAllIpAddresses(){
        try{
            const ipAddresses = await IpAdresses.findAll();
            return ipAddresses;
        }catch(e){
            throw new Error(e.message);
        }
    }

    async createIpAddress(ip_address){
        try{

            if(await IpAdresses.findOne({ where: { ip_address: ip_address}})){
                throw new Error("IP address already exists")
            }

            const ipAddress = await IpAdresses.create({ ip_address: ip_address })
            return ipAddress;
        }catch(e){
            throw new Error(e.message);
        }
    }

    async getAllIpAddressesAvailable(){
        try{
            const ipAddresses = await IpAdresses.findAll({ where: { available: true } });
            
            if(ipAddresses.length === 0){
                throw new Error("No IP addresses available")
            }
            
            return ipAddresses;
        }catch(e){
            throw new Error(e.message);
        }
    }

    async deleteIpAddress(ip_address){
        try{
            const ipAddress = await IpAdresses.findOne({ where: { ip_address: ip_address }})
            if(!ipAddress){
                return {status: 'error', message: 'Ip address not found'}
            }

            if(ipAddress.available === false){
                return {status: 'error', message: 'Ip address is associated with a device'}
            }

            await ipAddress.destroy({ where: { ip_address: ip_address}});
            return {status: 'success', message: 'Ip address deleted successfully'}
        }catch(e){
            throw new Error(e.message);
        }
    }
}

module.exports = { IpAdressesRepository }