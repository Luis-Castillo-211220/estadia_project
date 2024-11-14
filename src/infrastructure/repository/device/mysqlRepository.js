const { Device } = require("../../../domain/entity/device")
const { History } = require("../../../domain/entity/history")
const DeviceInterface  = require("../../../domain/port/deviceInterface")
const Sequelize = require('sequelize')
const { User } = require("../../../domain/entity/user")
const { IpAdresses} = require("../../../domain/entity/ipAddress")
const { getSSHClient } = require("../../services/sshConector/sshClient")


class DeviceRepository extends DeviceInterface {

    async createDevice(ip_address_id, owner_name, device_type, brand, model, serial, patrimony, user_id, mac_address, ubication, internet_level, proxy, observations){
        try{
            const user = await User.findByPk(user_id)
            if(!user){
                return {status: 'error', message: 'User not found'}
            }

            const ip = await IpAdresses.findOne(ip_address_id)

            if(!ip){
                return {status: 'error', message: 'IP Address not found'}
            }

            if(!ip.available){
                return {status: 'error', message: 'IP Address no disponible'}
            }
            
            const newDevice = await Device.create({
                ip_address_id: ip.ip_address_id,
                owner_name: owner_name,
                device_type: device_type,
                brand: brand,
                model: model,
                serial: serial,
                patrimony: patrimony,
                user_id: user_id,
            }, {
                fields: ["ip_address_id", "owner_name", "device_type", "brand", "model", 
                    "serial", "patrimony", "user_id"]
            })
            if (!newDevice){
                return {status: "error", message: "Error creating device"}
            } 

            const updateIp = await IpAdresses.update({
                mac_address: mac_address,
                ubication: ubication,
                internet_level: internet_level || "Nivel 1",
                proxy: proxy,
                available: false,
                observations: observations
            }, 
            { 
                where: { ip_address_id: newDevice.ip_address_id }
            });

            const ssh = getSSHClient()

            const command = `
                config firewall address
                edit "IP_${ip.ip_address.replace(/\./g, "_")}"
                set group "${internet_level}"
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

            //CREACIÓN DEL REGISTRO EN EL HISTORIAL DE MOVIMIENTOS
            const date = new Date()
            const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const newHistory = await History.create({
                user_id: user.user_id,
                date: date.toISOString().split('T')[0],
                time: time,
                // time: date.toTimeString().split(' ')[0],
                action: 'CREATE DEVICE',
                description: `Dispositivo creado: IP:${ip.ip_address} \n Creado por: ${user.name} \n Propietario: ${newDevice.owner_name}`,
            })

            if(!newHistory){
                throw new Error('Error al crear el registro en el historial, en repositorio')
            }
            return {status: 'success', message: 'Device created', data: newDevice}
        }catch(error){
            throw new Error(error.message)
        }
    }

    async getAllDevices(){
        try{
            const devices = await Device.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: IpAdresses,
                        attributes: ['ip_address', 'mac_address', 'ubication', 'internet_level'] //, 'available', 'observations']
                    }
                ], attributes: ['device_id', 'owner_name', 'device_type']
            })
            if (devices === undefined){
                throw new Error('Error al obtener los dispositivos, en repositorio')
            }
            return devices
        }catch(error){
            throw new Error(error.message)
        }
    }

    async getDeviceByIPAddress(ip_address){
        try{
            const ip = await IpAdresses.findOne({ where: { ip_address: ip_address } })

            const device = await Device.findOne({
                include: [
                    {
                        model: IpAdresses,
                        // as: 'ipAddress',
                        attributes: ['ip_address', 'mac_address', 'ubication', 'internet_level', 'available', 'observations']
                    },
                    // {
                    //     model: User,
                    //     // as: 'user',
                    //     attributes: ['name'] 
                    // }
                ],
                where: { ip_address_id: ip.ip_address_id }
            })

            if (!device){
                return null
            }
            return device
        }catch(error){
            throw new Error(error.message)
        }
    }

    async deleteDeviceByIPAddress(ip_address){
        try{
            const ip = await IpAdresses.findOne({ where: { ip_address: ip_address } })

            if(!ip){
                return {status: 'error', message: 'IP address not found'} 
            } else if(ip.available){
                return {status: 'error', message: 'Ip address already available'}
            }

            const device = await Device.findOne({ where: { ip_address_id: ip.ip_address_id }})
            if(!device){
                // throw new Error("Device not found")
                return {status: "not found", message: 'Device not found'}
            }

            const affectedRows = await Device.destroy({ where: { ip_address_id: ip.ip_address_id } })

            if(affectedRows === 0){
                // throw new Error('Error al eliminar el dispositivo, en repositorio')
                return {status: "error", message: 'Error deleting device'}
            }

            const newIp = await IpAdresses.update({
                mac_address: null,
                ubication: null,
                internet_level: null,
                proxy: null,
                available: true,
                observations: null
            }, 
            { where: { ip_address_id: ip.ip_address_id}} )

            const ssh = getSSHClient()

            const command = `
                config firewall address
                edit "IP_${ip.ip_address.replace(/\./g, "_")}"
                unset group
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

            const user = await User.findByPk(device.user_id)
            
            const date = new Date()
            const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const newHistory = await History.create({
                user_id: user.user_id,
                date: date.toISOString().split('T')[0],
                time: time,
                action: 'ELIMINATED DEVICE',
                description: `Dispositivo Eliminado: IP:${ip.ip_address} -> Disponible \n Eliminado por: ${user.name} \n`,
            })
            return {status: "success", message: 'Device Deleted and ip address now is available'}
        }catch(error){
            throw new Error(error.message)
        }
    }

    async getAllDevicesByIPAddress(ip_address){
        const Op = Sequelize.Op;
        try{

            const ips = await IpAdresses.findAll({ where: { ip_address: { [Op.like]: `%${ip_address}%` }}})

            if(!ips || ips.length === 0){
                return {status: 'error', message: 'IP address not found'}
            }

            const ipsId = ips.map(ip => ip.ip_address_id);

            const devices = await Device.findAll({ where: 
                { ip_address_id: { [Op.in]: `%${ipsId}%` } } })
            if (devices === undefined){
                return {status: 'error', message:'No devices found for ip address'}
            }
            return {status: 'success', message: 'IP addresses found', data: devices}
        }catch(error){
            throw new Error(error.message)
        }
    }
    
    //PENDIENTE SSH FORTIGATE
    async updateDeviceById(device_id, ip_address, owner_name, ubication, internet_level, groups){
        try{
            const device = await Device.findOne({ where: { device_id: device_id } })
            if (!device){
                return {status:"error", message: "Device not found"}
            }

            const updatedFields = {};
            // Verificar solo los campos que se proporcionan en la solicitud
            if (ip_address !== undefined && ip_address !== device.ip_address) {
                updatedFields.ip_address = ip_address;
            }
            if (owner_name !== undefined && owner_name !== device.owner_name) {
                updatedFields.owner_name = owner_name;
            }
            if (ubication !== undefined && ubication !== device.ubication) {
                updatedFields.ubication = ubication;
            }
            if (internet_level !== undefined && internet_level !== device.internet_level) {
                updatedFields.internet_level = internet_level;
            }
            if (groups !== undefined && groups !== device.groups) {
                updatedFields.groups = groups;
            }
            
            // Si no hay cambios, evitamos la llamada innecesaria a la BD
            if (Object.keys(updatedFields).length === 0) {
                return {status:'success', message: 'No hay cambios que actualizar'}
            }

            const updatedDevice = await Device.update(updatedFields, 
                { where: { device_id: device_id } });

            if (!updatedDevice) {
                return {status:'error', message: 'No se pudo actualizar el dispositivo'}
            }

            //CREACION DEL REGISTRO EN EL HISTORIAL DE MOVIMIENTOS
            const date = new Date()
            const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            await History.create({
                user_name: 'name_test',
                date: date.toISOString().split('T')[0],
                time: time,
                action: 'UPDATE',
                description: `Dispositivo actualizado: ${device.ip_address} \n Campos actualizados: ${updatedFields}`,
            })
            
            return {status: 'success', message: 'Dispositivo actualizado correctamente'}
        }catch(err){
            throw new Error(err.message)
        }
    }

    async getDevicesByName(owner_name){
        const Op = Sequelize.Op;
        try{
            const devices = await Device.findAll({ where: 
                { owner_name: { [Op.like]: `%${owner_name}%` } } })
            if (devices === undefined){
                throw new Error('Error al obtener los dispositivos por nombre, en repositorio')
            }
            return devices
        }catch(error){
            throw new Error(error.message)
        }
    }
}

module.exports = { DeviceRepository };