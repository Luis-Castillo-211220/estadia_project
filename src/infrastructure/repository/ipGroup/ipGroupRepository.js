const IPGroupInterface = require('../../../domain/port/ipGroupInterface')
const { IpGroup } = require('../../../domain/entity/ipGroup')
const { getSSHClient } = require("../../services/sshConector/sshClient")
const { InternetLevel } = require('../../../domain/entity/internetLevel')
const { IpAdresses } = require('../../../domain/entity/ipAddress')


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
            return null
        }
    }

    async createIpGroup(name, description, internet_level_id, ip_address) {
        try {

            let internetLevel = await InternetLevel.findByPk(internet_level_id)

            if (!internetLevel) {
                return {
                    status: 'error',
                    message: 'Internet level not found'
                }
            }

            const ssh = getSSHClient();

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
                })

                await IpAdresses.update({
                    ip_group_id: ipGroup.ip_group_id
                }, {
                    where: {
                        ip_address_id: ip_exists.ip_address_id
                    }
                })

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
                console.log("1")
                console.log(await executeCommand(createCommandIp))

                const commandCreateGroup = `
                    config firewall addrgrp
                        edit "${name}"
                        set member "${placeHolderIp}"
                        next
                    end
                `;
                console.log("2")
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
                console.log("3")
                console.log(await executeCommand(commandAsociatePolicy))

                const ipGroup = await IpGroup.create({
                    name: name,
                    description: description,
                    internet_level_id: internet_level_id
                })

                return { status: 'success', message: 'IP group created', data: ipGroup }
            }
        } catch (e) {
            console.error('Error creating IP group:', e)
            return null
        }
    }

}

module.exports = { IpGroupRepository }