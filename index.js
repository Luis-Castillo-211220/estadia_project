const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { sequelize, connectDB } = require('./src/database/mysql') //POSTGRESQL - Confunsión con el nombre 
const { sequelize, connectDB } = require('./src/database/sqlserver')
const { deviceRouter } = require("./src/infrastructure/routes/deviceRouter")
const { historyRouter } = require('./src/infrastructure/routes/historyRouter');
const { userRouter } = require('./src/infrastructure/routes/userRoutes')
const { ipAdressesRouter } = require('./src/infrastructure/routes/ipAdressesRouter')
const {  internetLevelRouter } = require('./src/infrastructure/routes/internetLevelRoutes')
const { ipGroupRouter } = require('./src/infrastructure/routes/ipGroupRouter')
const { initializeConnection } = require("./src/infrastructure/services/sshConector/sshClient")

const app = express();
const PORT = 3005;

let corsOptions = {
    origin: 'https://127.0.0.1:3005',
    optionSuccessStatus: 200
}

app.use(bodyParser.json());
// app.use(cors(corsOptions));
app.use(cors());
app.use('/api/v1/device/', deviceRouter)
app.use('/api/v2/history/', historyRouter)
app.use('/api/v3/user/', userRouter)
app.use('/api/v4/ipAdresses/', ipAdressesRouter)
app.use('/api/v5/internetLevel/', internetLevelRouter)
app.use('/api/v6/ipGroup/', ipGroupRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!') || res.status(500).send('Internal Server Error')
})

connectDB().then(async () => {
    try{
        console.log("Initializing FortiGate SSH connection...");
        await initializeConnection();
        console.log('SSH connection initialized successfully');
    }catch(err){
        console.error('Failed to initializate SSH connection', err);
        // process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`); 
    });
}).catch(error => {
    console.error('Failed to start the server: ', error);
})
