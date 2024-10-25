const { Device } = require("../../../domain/entity/device")
const { History } = require("../../../domain/entity/history")
const DeviceInterface  = require("../../../domain/port/deviceInterface")
const Sequelize = require('sequelize')

class DeviceRepository extends DeviceInterface {

    async createDevice(ip_address, mac_address, owner_name, ubication, internet_level, 
        proxy, device_type, brand, model, serial, patrimony, observations, groups, user_name){
        try{
            const newDevice = await Device.create({
                ip_address: ip_address,
                mac_address: mac_address,
                owner_name: owner_name,
                ubication: ubication,
                internet_level: internet_level,
                proxy: proxy,
                device_type: device_type,
                brand: brand,
                model: model,
                serial: serial,
                patrimony: patrimony,
                observations: observations,
                groups: groups
            }, {
                fields: ["ip_address", "mac_address", "owner_name", "ubication", 
                    "internet_level", "proxy", "device_type", "brand" ,"model", 
                    "serial", "patrimony", "observations", "groups"]
            })
            if (!newDevice){
                throw new Error('Error al crear el dispositivo, en repositorio')
            }

            //CREACIÓN DEL REGISTRO EN EL HISTORIAL DE MOVIMIENTOS
            const date = new Date()
            const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const newHistory = await History.create({
                user_name: user_name,
                date: date.toISOString().split('T')[0],
                time: time,
                // time: date.toTimeString().split(' ')[0],
                action: 'CREATE',
                description: `Dispositivo creado: ${newDevice.ip_address}`,
            })

            if(!newHistory){
                throw new Error('Error al crear el registro en el historial, en repositorio')
            }
            return newDevice
        }catch(error){
            throw new Error(error.message)
        }
    }

    async getAllDevices(){
        try{
            const devices = await Device.findAll()
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
            const device = await Device.findOne({ where: { ip_address: ip_address } })
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
            const device = await Device.findOne({ where: { ip_address: ip_address }})
            if(!device){
                // throw new Error("Device not found")
                return {status: "not found"}
            }

            const affectedRows = await Device.destroy({ where: { ip_address: ip_address } })

            if(affectedRows === 0){
                // throw new Error('Error al eliminar el dispositivo, en repositorio')
                return {status: "error"}
            }

            const date = new Date()
            const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const newHistory = await History.create({
                user_name: 'name_test',
                date: date.toISOString().split('T')[0],
                time: time,
                action: 'DELETE',
                description: `Dispositivo eliminado: ${ip_address}`,
            })
            return {status: "success"}
        }catch(error){
            throw new Error(error.message)
        }
    }

    async getAllDevicesByIPAddress(ip_address){
        const Op = Sequelize.Op;
        try{
            const devices = await Device.findAll({ where: 
                { ip_address: { [Op.like]: `%${ip_address}%` } } })
            if (devices === undefined){
                throw new Error('Error al obtener los dispositivos por IP, en repositorio')
            }
            return devices
        }catch(error){
            throw new Error(error.message)
        }
    }

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
}

module.exports = { DeviceRepository };