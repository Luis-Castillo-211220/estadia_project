const express = require('express');
const bodyParser = require('body-parser');
// const { sequelize, connectDB } = require('./src/database/mysql') //POSTGRESQL - Confunsión con el nombre 
const { sequelize, connectDB } = require('./src/database/sqlserver')
const { deviceRouter } = require("./src/infrastructure/routes/deviceRouter")
const { historyRouter } = require('./src/infrastructure/routes/historyRouter');
const { userRouter } = require('./src/infrastructure/routes/userRoutes')

const app = express();
const PORT = 3005;

app.use(bodyParser.json());
app.use('/api/v1/device/', deviceRouter)
app.use('/api/v2/history/', historyRouter)
app.use('/api/v3/user/', userRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to start the server: ', error);
})

