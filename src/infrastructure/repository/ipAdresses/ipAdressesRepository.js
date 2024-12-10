const IpAdressesInterface = require("../../../domain/port/ipAddressesInterface")
const { IpAdresses } = require("../../../domain/entity/ipAddress")
const { getSSHClient } = require("../../services/sshConector/sshClient")
const sequelize = require("sequelize");
const { IpGroup } = require("../../../domain/entity/ipGroup");

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

    async addIpAddressInGroup(ip_addresses, ip_group_id){
        try{
            const ipGroup = await IpGroup.findByPk(ip_group_id);

            if(!ipGroup){
                return {status: 'error', message: 'Ip group not found'}
            }

            const ipRecords = await IpAdresses.findAll({
                where:{
                    ip_address: ip_addresses
                }
            })

            // Verificar que todas las IPs existen
            if (ipRecords.length !== ip_addresses.length) {
                const missingIps = ip_addresses.filter(
                    (ip) => !ipRecords.find((record) => record.ip_address === ip)
                );
                return {
                    status: 'error',
                    message: 'Some IP addresses were not found in the database',
                    missing_ips: missingIps,
                };
            }

            // Validar que ninguna IP ya esté asociada a otro grupo
            const invalidIps = ipRecords.filter((ipRecord) => ipRecord.ip_group_id !== null);

            if (invalidIps.length > 0) {
                return {
                    status: 'error',
                    message: 'Some IP addresses are already assigned to another group',
                    invalid_ips: invalidIps.map((ip) => ip.ip_address),
                };
            }

            // Validar que las IPs no tengan un nivel de internet directamente asignado
            const internetLevelAssigned = ipRecords.filter(
                (ipRecord) => ipRecord.internet_level_id !== null
            );
        
            if (internetLevelAssigned.length > 0) {
                return {
                    status: 'error',
                    message: 'Some IP addresses have an Internet Level assigned directly',
                    conflicting_ips: internetLevelAssigned.map((ip) => ip.ip_address),
                };
            }

            // Actualizar los registros de las IPs en la base de datos
            await Promise.all(
                ipRecords.map((ipRecord) =>
                    ipRecord.update({
                        ip_group_id,
                    })
                )
            );

            const ssh = getSSHClient();

            const command = `
                config firewall addrgrp
                    edit "${ipGroup.name}"
                        ${ip_addresses
                            .map(
                                (ip) => 
                                    `append member "IP_${ip.replace(/\./g, '_')}"`
                            )
                            .join('\n')}
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
    
            console.log('Fortigate Response:', sshResponse);

            return {
                status:'success',
                message: 'IP addresses added successfully to the group',
                data: ip_addresses
            }

        }catch(e){
            throw new Error(e.message);
        }
    }
}

module.exports = { IpAdressesRepository }