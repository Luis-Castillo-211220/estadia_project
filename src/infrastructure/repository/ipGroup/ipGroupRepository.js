const IPGroupInterface = require('../../../domain/port/ipGroupInterface')
const { IpGroup } = require('../../../domain/entity/ipGroup')
const { getSSHClient } = require("../../services/sshConector/sshClient")


class IpGroupRepository extends IPGroupInterface {

    async getAllIPGroups(){
        try{
            const result = await IpGroup.findAll()

            if(result.length === 0){
                return {status: 'error', message: 'No IP groups found'}
            }

            return {status: 'success', message: 'IP groups found', data: result}
        }catch(e){
            console.error('Error retrieving IP groups:', e)
            return null
        }
    }

    async createIpGroup(name, description, internet_level_id){
        try{
            const ipGroup = await IpGroup.create({
                name: name,
                description: description || null,
                internet_level_id: internet_level_id || null
            })

            if(!ipGroup){
                return {status: 'error', message: 'Error creating IP group'}
            }

            const ssh = getSSHClient();

            const command = `
                config firewall addrgrp
                edit "${ipGroup.name}"
                set comment "${ipGroup.description || ''}"
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
            return {status:'success', message: 'IP group created', data: ipGroup}

        }catch(e){
            console.error('Error creating IP group:', e)
            return null
        }
    }

}

module.exports = { IpGroupRepository }