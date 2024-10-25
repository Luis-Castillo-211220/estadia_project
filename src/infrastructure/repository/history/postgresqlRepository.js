const { History } = require("../../../domain/entity/history");
const HistoryInterface = require("../../../domain/port/historyInterface")
const Sequelize = require('sequelize')
const { literal } = require('sequelize')
class HistoryRepository extends HistoryInterface{

    async getAllHistory(){
        try{
            const allHistory = await History.findAll({
                attributes: [
                    'history_id',
                    'user_name',
                    'date',
                    [literal('CONVERT (VARCHAR(8), [time], 108)'), 'time'],
                    'action',
                    'description',
                    'createdAt',
                    'updatedAt',
                ]
            });
            return allHistory;
        } catch (error) {
            throw new Error("Error getting all history: " + error.message);
        }
    }

    async getHistoryByName(user_name){
        try{
            const x = await History.findAll( { attributes: ['history_id',
                'user_name',
                'date',
                [literal('CONVERT (VARCHAR(8), [time], 108)'), 'time'],
                'action',
                'description',
                'createdAt',
                'updatedAt'], where: { user_name}});

            // return historyByUserName;
            return x;
        } catch (error) {
            throw new Error("Error getting history by user name: " + error.message);
        }
    } 

    async getHistoryByDate(startDate, endDate){
        const Op = Sequelize.Op;
        try{

            if(!startDate && !endDate){
                return { status: "error", message: "Debe ingresar al menos una fecha" };
            }

            if(!startDate){
                return { status: "error", message: "Debe ingresar una fecha de inicio" };
            }

            if(startDate && !endDate){
                const histories = await History.findAll({attributes: [                'history_id',
                    'user_name',
                    'date',
                    [literal('CONVERT (VARCHAR(8), [time], 108)'), 'time'],
                    'action',
                    'description',
                    'createdAt',
                    'updatedAt',], where: { date: startDate }});
                if(histories){
                    return { status: "success", data: histories };
                }else{
                    throw new Error('No se encontraron historias para la fecha ingresada');
                }
            }

            if(startDate && endDate){
                const historyByDate = await History.findAll({attributes: [                'history_id',
                    'user_name',
                    'date',
                    [literal('CONVERT (VARCHAR(8), [time], 108)'), 'time'],
                    'action',
                    'description',
                    'createdAt',
                    'updatedAt',],  where: { date: { [Op.between]: [startDate, endDate] } } });
                if(!historyByDate){
                    throw new Error('No se encontraron registros');
                }
                return { status: "success", data: historyByDate };
            }

        } catch (error) {
            throw new Error("Error getting history by date range: " + error.message);
        }
    }
}

module.exports = { HistoryRepository };