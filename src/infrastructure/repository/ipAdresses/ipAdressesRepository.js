const IpAdressesInterface = require("../../../domain/port/ipAddressesInterface")
const { IpAdresses } = require("../../../domain/entity/ipAddress")
const { getSSHClient, ensureConnection } = require("../../services/sshConector/sshClient")
const { sequelize } = require('../../../database/sqlserver');
const { IpGroup } = require("../../../domain/entity/ipGroup");
const { QueryTypes } = require('sequelize')

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
        const transaction = await sequelize.transaction();
        try{
            const existingIpAddress = await IpAdresses.findOne({ where: { ip_address: ip_address } })

            if(existingIpAddress){
                return {
                    status: 'error',
                    message: 'IP address already exists'
                }
            }

            const result = await IpAdresses.create({
                ip_address,
                mask,
                available: true
            }, {
                transaction: transaction
            })

            if(!result){
                return {
                    status: 'error',
                    message: 'Error creating IP address'
                }
            }

            const ssh = ensureConnection()

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

            transaction.commit();
            return {
                status: 'success',
                message: 'IP address created successfully',
                data: result
            };
        }catch(e){
            transaction.rollback();
            console.error('Error in createIpAddress:', e.message);   
            
            return {
                status: 'error',
                message: e.message
            }
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
        const transaction = await sequelize.transaction();
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

            const ssh = ensureConnection();
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

            const result = await ipAddress.destroy({ where: { ip_address: ip_address}},
                {transaction: transaction}
            );

            if(!result) {
                return {status: 'error', message: 'Failed to delete IP address'}
            }
            
            transaction.commit();
            return {status: 'success', message: 'Ip address deleted successfully'}
        }catch(e){
            transaction.rollback();
            throw new Error(e.message);
        }
    }

    async addIpAddressInGroup(ip_addresses, ip_group_id){
        const transaction = await sequelize.transaction();
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
                    }, {
                        transaction: transaction
                    })
                )
            );

            const ssh = ensureConnection();

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

            transaction.commit();
            return {
                status:'success',
                message: 'IP addresses added successfully to the group',
                data: ip_addresses
            }

        }catch(e){
            transaction.rollback();
            throw new Error(e.message);
        }
    }
}

module.exports = { IpAdressesRepository }