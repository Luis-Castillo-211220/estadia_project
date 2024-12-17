const IPGroupInterface = require('../../../domain/port/ipGroupInterface')
const { IpGroup } = require('../../../domain/entity/ipGroup')
const { getSSHClient, ensureConnection } = require("../../services/sshConector/sshClient")
const { InternetLevel } = require('../../../domain/entity/internetLevel')
const { IpAdresses } = require('../../../domain/entity/ipAddress')
const { sequelize } = require('../../../database/sqlserver')

class IpGroupRepository extends IPGroupInterface {

    async getAllIPGroups() {
        try {
            const result = await IpGroup.findAll()

            if (result.length === 0) {
                return { status: 'error', message: 'No IP groups found' }
            }

            return { status: 'success', message: 'IP groups found', data: result }
        } catch (e) {
            console.error('Error retrieving IP groups:', e)
            return {
                status: 'error',
                message: e.message
            }
        }
    }

    async createIpGroup(name, description, internet_level_id, ip_address) {
        const transaction = await sequelize.transaction();
        try {
            let internetLevel = await InternetLevel.findByPk(internet_level_id)

            if (!internetLevel) {
                return {
                    status: 'error',
                    message: 'Internet level not found'
                }
            }

            const ssh = ensureConnection();

            const executeCommand = async (cmd) => {
                return new Promise((resolve, reject) => {
                    ssh.exec(cmd, (err, stream) => {
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
            };

            if (ip_address) {
                const ip_exists = await IpAdresses.findOne({
                    where: { ip_address: ip_address }
                })

                if (ip_exists) {
                    if (ip_address.ip_group_id != null) {
                        return {
                            status: 'error',
                            message: 'IP group already exists in this ip address'
                        }
                    }
                } else {
                    return {
                        status: 'error',
                        message: 'Ip address not found in database'
                    }
                }

                let ipAux = ip_exists.ip_address

                const commandCreateGroup = `
                config firewall addrgrp
                    edit "${name}"
                    set member "IP_${ipAux.replace(/\./g, "_")}"
                    next
                end
                `;

                console.log(await executeCommand(commandCreateGroup))

                const commandAsociatePolicy = `
                config firewall policy
                    edit "${internetLevel.name}"
                    set srcaddr "${name}"
                    next
                end
                `;

                console.log(await executeCommand(commandAsociatePolicy))

                const ipGroup = await IpGroup.create({
                    name: name,
                    description: description,
                    internet_level_id: internet_level_id
                }, {
                    transaction: transaction
                })

                await IpAdresses.update({
                    ip_group_id: ipGroup.ip_group_id
                }, {
                    where: {
                        ip_address_id: ip_exists.ip_address_id
                    }
                }, {
                    transaction: transaction
                })

                transaction.commit();
                return {
                    status: 'success',
                    message: 'Group created successfully',
                    data: ipGroup
                }

            } else {
                let ip_exists = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
                let placeHolderIp = `IP_Test_${ip_exists.replace(/\.g/, "_")}`

                const createCommandIp = `
                    config firewall address
                        edit "${placeHolderIp}"
                        set subnet "${ip_exists}" 255.255.255.255
                        next
                    end
                `
                console.log(await executeCommand(createCommandIp))

                const commandCreateGroup = `
                    config firewall addrgrp
                        edit "${name}"
                        set member "${placeHolderIp}"
                        next
                    end
                `;
                console.log(await executeCommand(commandCreateGroup))

                const commandAsociatePolicy = `
                    config firewall policy
                        edit "${internetLevel.internet_level_id}"
                        set srcaddr "${name}"
                        set action "accept"
                        set schedule "always"
                        next
                    end
                `;
                console.log(await executeCommand(commandAsociatePolicy))

                const ipGroup = await IpGroup.create({
                    name: name,
                    description: description,
                    internet_level_id: internet_level_id
                }, {
                    transaction: transaction
                })
                transaction.commit()
                return { status: 'success', message: 'IP group created', data: ipGroup }
            }
        } catch (e) {
            transaction.rollback();
            console.error('Error creating IP group:', e)
            return {
                status: 'error',
                message: e.message
            }
        }
    }

    async changeInternetLevelGroup(ip_group_id, new_internet_level_id){
        const transaction = await sequelize.transaction()
        try{
            const ipGroup = await IpGroup.findByPk(ip_group_id)
            if(!ipGroup){
                return {
                    status: 'error',
                    message: 'IP group not found'
                }
            }

            const executeCommand = async (cmd) => {
                return new Promise((resolve, reject) => {
                    ssh.exec(cmd, (err, stream) => {
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
            };

            if(new_internet_level_id){
                const newInternetLevel = await InternetLevel.findByPk(new_internet_level_id)
                if(!newInternetLevel){
                    return {
                        status: 'error',
                        message: 'New internet level not found'
                    }
                }
    
                ipGroup.internet_level_id = new_internet_level_id
                await ipGroup.save({transaction: transaction});
    
                const ssh = ensureConnection()
    
                let command = `
                    config firewall policy
                    edit "${newInternetLevel.name}"
                    set srcaddr "${ipGroup.name}"
                    next
                    end
                `;    
                console.log('Fortigate Response: ' + executeCommand(command));    
            }else{
                const internetAux = await InternetLevel.findByPk(ipGroup.internet_level_id)
                ipGroup.internet_level_id = null; // O 0
                await ipGroup.save({ transaction: transaction });
    
                sshCommand = `
                    config firewall policy
                    edit "${internetAux.name}"
                    unset srcaddr
                    end
                `;

                console.log('Fortigate Response: ' + executeCommand(command));   
            }

            transaction.commit();
            return {
                status:'success',
                message: 'Internet level updated successfully'
            }
        }catch (e) {
            transaction.rollback()
            console.error('Error changing internet level for IP group:', e)
            return {
                status: 'error',
                message: e.message
            }
        }
    }

}

module.exports = { IpGroupRepository }