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

            const ssh = getSSHClient()

            const command = `
                config firewall policy
                edit ${result.id}
                set name "${name}"
                set srcintf "lan"
                set dstintf "wan"
                set srcaddr "all"
                set dstaddr "all"
                set service ${allowed_services.replace(/,/g, ' ')}
                set schedule "${allowed_timeframe === 'always' ? 'always' : allowed_timeframe}"
                set action accept
                set logtraffic all
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
                message: 'Internet level created successfully and policy added to FortiGate',
                data: result
            };
        }catch(err){
            console.error(err)
            return null
        }
    }

}

module.exports = { InternetLevelRepository }