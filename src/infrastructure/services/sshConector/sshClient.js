const { Client } = require('ssh2');
const sshConfig = require('./sshConfig'); // Archivo de configuración SSH

let sshConnection = null; // Variable para almacenar la conexión SSH
let isConnecting = false; // Evitar múltiples intentos de reconexión simultáneos

async function initializeConnection() {
    if (sshConnection) {
        console.log("SSH connection is already established.");
        return sshConnection;
    }

    sshConnection = new Client();

    return new Promise((resolve, reject) => {
        sshConnection
            .on('ready', () => {
                console.log("SSH connection established with FortiGate.");
                resolve(sshConnection);
            })
            .on('error', (err) => {
                console.error("SSH connection error:", err);
                sshConnection = null;
                reconnect(); // Intentar reconectar
                reject(err);
            })
            .on('end', () => {
                console.warn("SSH connection ended.");
                sshConnection = null;
                reconnect(); // Intentar reconectar
            })
            .on('close', (hadError) => {
                console.warn("SSH connection closed. Had error:", hadError);
                sshConnection = null;
                reconnect(); // Intentar reconectar
            })
            .connect(sshConfig);
    });
}

function reconnect() {
    if (isConnecting) return; // Evitar múltiples intentos simultáneos
    isConnecting = true;

    console.log("Attempting to reconnect to FortiGate...");

    setTimeout(async () => {
        try {
            await initializeConnection();
            console.log("Reconnected to FortiGate successfully.");
        } catch (err) {
            console.error("Reconnection attempt failed:", err);
            reconnect(); // Reintentar en caso de fallo
        } finally {
            isConnecting = false;
        }
    }, 5000); // Espera 5 segundos antes de reintentar
}

function getSSHClient() {
    if (!sshConnection) {
        throw new Error("SSH connection has not been established. Call initializeConnection first.");
    }
    return sshConnection;
}

module.exports = {
    initializeConnection,
    getSSHClient,
};
