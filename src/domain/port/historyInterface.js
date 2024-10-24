const { History } = require("../entity/history")

class HistoryInterface{
    
    // /**
    //  * @param 
    //  */
    // async createRegister(){ 
        
    // }

    /** 
     *@returns {Promise<Array<History>|null|String>}
     */
    async getAllHistory(){
        throw new Error("getAllHistory method not implemented in History interface")
    }

    /**
     * @param {String} user_name
     * @returns {Promise<History|null|Array<History>>}
     */
    async getHistoryByName(user_name){
        throw new Error("getHistoryByName method not implemented in History interface")
    }

    /**
     * @param {String} startDate
     * @param {String} endDate
     * @returns {Promise<Array<History>|History|null|String>}
     */
    async getHistoryByDate(startDate, endDate){
        throw new Error("getHistoryByDate method not implemented in History interface")
    }
}

module.exports = HistoryInterface;