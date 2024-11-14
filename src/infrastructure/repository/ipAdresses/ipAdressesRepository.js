const IpAdressesInterface = require("../../../domain/port/ipAddressesInterface")
const { IpAdresses } = require("../../../domain/entity/ipAddress")
const { getSSHClient } = require("../../services/sshConector/sshClient")


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

    async createIpAddress(ip_address, mask){
        try{

            if(await IpAdresses.findOne({ where: { ip_address: ip_address}})){
                return {
                    status: 'error',
                    message: 'IP address already exists'
                }
            }

            const ipAddress = await IpAdresses.create({ 
                ip_address: ip_address,
                mask: mask
            })

            if(!ipAddress){
                return {
                    status: 'error',
                    message: 'Error creating IP address'
                }
            }

            const ssh = getSSHClient()

            const command = `
                config firewall address
                edit "IP_${ip_address.replace(/\./g, "_")}"
                set subnet ${ip_address} ${mask}
                next
                end
            `;

            const sshResponse = await new Promise((resolve, reject) => {
                ssh.exec(command, (err, stream) => {
                    if (err) return reject(err);
                    let stdout = '';
                    let stderr = '';
    
                    stream
                        .on('close', (code) => {
                            if (code === 0) resolve(stdout);
                            else reject(stderr);
                        })
                        .on('data', (data) => {
                            stdout += data.toString();
                        })
                        .stderr.on('data', (data) => {
                            stderr += data.toString();
                        });
                });
            });

            console.log("Fortigate Response: ", sshResponse)


            return {
                status: 'success',
                message: 'IP address created successfully',
                data: ipAddress
            };
        }catch(e){
            console.error('Error in createIpAddress:', e.message);

            // Revertir creación en base de datos si falla en Fortigate
            if (ip_address) {
                await IpAdresses.destroy({ where: { ip_address: ip_address } });
            }
            
            throw new Error(e.message);

            // return {
            //     status: 'error',
            //     message: 'Failed to create IP address',
            //     error: e.message,
            // };
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
            const ipAddress = await IpAdresses.findOne({    where: { ip_address: ip_address }})
            if(!ipAddress){
                return {
                    status: 'error', 
                    message: 'Ip address not found'
                }
            }

            if(ipAddress.available === false){
                return {status: 'error', message: 'Ip address is associated with a device. \n Please remove device first.'}
            }

            const ssh = getSSHClient();
            const command = `
                config firewall address
                delete "IP_${ip_address.replace(/\./g, "_")}"  
                end
            `;
    
            const sshResponse = await new Promise((resolve, reject) => {
                ssh.exec(command, (err, stream) => {
                    if (err) return reject(err);
                    let stdout = '';
                    let stderr = '';
    
                    stream
                        .on('close', (code) => {
                            if (code === 0) resolve(stdout);
                            else reject(stderr);
                        })
                        .on('data', (data) => {
                            stdout += data.toString();
                        })
                        .stderr.on('data', (data) => {
                            stderr += data.toString();
                        });
                });
            });
    
            console.log('Fortigate Response:', sshResponse);

            const result = await ipAddress.destroy({ where: { ip_address: ip_address}});

            if(!result) {
                return {status: 'error', message: 'Failed to delete IP address'}
            }
            
            return {status: 'success', message: 'Ip address deleted successfully'}
        }catch(e){
            throw new Error(e.message);
        }
    }
}

module.exports = { IpAdressesRepository }