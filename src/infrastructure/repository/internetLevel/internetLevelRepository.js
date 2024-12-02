const InternetLevelInterface = require("../../../domain/port/internetLevelInterface")
const { InternetLevel } = require("../../../domain/entity/internetLevel")
const { getSSHClient } = require("../../services/sshConector/sshClient")

class InternetLevelRepository extends InternetLevelInterface{

    async createInternetLevel(name, description, allowed_services, allowed_timeframe, bandwidth_limit, priority){
        try{
            const result = await InternetLevel.create({
                name: name,
                description: description || null,
                allowed_services: allowed_services || null,
                allowed_timeframe: allowed_timeframe || "always",
                bandwidth_limit: bandwidth_limit,
                priority: priority || 1
            });

            if(!result){
                return {
                    status: 'error',
                    message: 'Failed to create internet level'
                }
            }
            
            // Implements the create rule in fortigate

            const trafficShaperName = `traffic-shaper-${name.replace(/\s+/g, '_').toLowerCase()}`;
            const servicesFormatted = allowed_services
            ? allowed_services.replace(/,/g, '')
            : 'ALL';

            const scheduleFormatted = allowed_timeframe === 'always' ? 'always' : allowed_timeframe;

            const ssh = getSSHClient()

        // Comando para crear el perfil de tráfico
            const trafficShaperCommand = `
                config firewall shaper traffic-shaper
                edit "${trafficShaperName}"
                set guaranteed-bandwidth ${bandwidth_limit}
                set maximum-bandwidth ${bandwidth_limit}
                next
                end`;

            const command = `
                config firewall policy
                edit ${result.internet_level_id}
                set name "${name}"
                set srcintf "port1"
                set dstintf "fortilink"
                set srcaddr "all"
                set dstaddr "all"
                set service ${servicesFormatted}
                set schedule "${scheduleFormatted}"
                set action accept
                set logtraffic all
                next
                end`
            ;

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
            
            console.log(await executeCommand(trafficShaperCommand))
            const sshResponse = await executeCommand(command);

            console.log("Fortigate Response: ", sshResponse)

            return {
                status: 'success',
                message: 'Internet level created successfully and policy added to FortiGate',
                data: result
            };
        }catch(err){
            console.error(err)
            throw new Error(err.message)
        }
    }

    async deleteInternetLevelById(internet_level_id){
        try{
            const intLevel = await InternetLevel.findByPk(internet_level_id)

            if(!intLevel){
                return {
                    status: 'error',
                    message: 'Internet level not found'
                }
            }
            
            const trafficName = `traffic-shaper-${intLevel.name}`

            const ssh = getSSHClient()

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

            const command = `
                config firewall policy
                delete "${intLevel.internet_level_id}"
                end`;

            const comandShaper = `
                config firewall shaper traffic-shaper
                delete "${trafficName.replace(/\s+/g, '_').toLowerCase()}"
                end`

            console.log("Shaper traffic Deleting response: \n", await executeCommand(comandShaper));
            console.log("Policy Deleting response: \n", await executeCommand(command));

            await InternetLevel.destroy({ where: { internet_level_id: internet_level_id }})

            return {
                status:'success',
                message: 'Internet level deleted successfully'
            }

        }catch (e) {
            console.error(e)
            throw new Error(e.message)
        }
    }

}

module.exports = { InternetLevelRepository }