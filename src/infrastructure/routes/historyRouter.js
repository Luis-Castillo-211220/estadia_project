const express = require('express');

const historyRouter= express.Router();

const { 
    getAllHistoryController,
    getHistoryByDateController,
    getHistoryByNameController
} = require("../dependencies/history/historiesDependencies")

historyRouter.get('/', getAllHistoryController.run.bind(getAllHistoryController));
historyRouter.get('/:user_name', getHistoryByNameController.run.bind(getHistoryByNameController));
historyRouter.get('/get_by_date/result', getHistoryByDateController.run.bind(getHistoryByDateController));

module.exports = { historyRouter };