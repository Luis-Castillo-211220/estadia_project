const { Client } = require('ssh2');
const sshConfig = require('./sshConfig'); // Archivo de configuración SSH

let sshConnection = null; // Variable para almacenar la conexión SSH
let isConnecting = false; // Evitar múltiples intentos de reconexión simultáneos
let connectionPromise = null; // Promesa compartida para asegurar que todas las operaciones esperen la reconexión

async function initializeConnection() {
    if (sshConnection) {
        console.log("SSH connection is already established.");
        return sshConnection;
    }

    sshConnection = new Client();

    return new Promise((resolve, reject) => {
        sshConnection
            .on("ready", () => {
                console.log("SSH connection established with FortiGate.");
                resolve(sshConnection);
            })
            .on("error", (err) => {
                console.error("SSH connection error:", err);
                handleDisconnection(err);
                reject(err);
            })
            .on("end", () => {
                console.warn("SSH connection ended.");
                handleDisconnection();
            })
            .on("close", (hadError) => {
                console.warn("SSH connection closed. Had error:", hadError);
                handleDisconnection();
            })
            .connect(sshConfig);
    });
}

function handleDisconnection(error) {
    sshConnection = null;
    if (!isConnecting) {
        reconnect(); // Intentar reconectar si no se está reconectando ya
    }
}

function reconnect() {
    if (isConnecting) return; // Evitar múltiples intentos simultáneos
    isConnecting = true;

    console.log("Attempting to reconnect to FortiGate...");

    connectionPromise = new Promise((resolve, reject) => {
        const tryReconnect = async () => {
            try {
                await initializeConnection();
                console.log("Reconnected to FortiGate successfully.");
                resolve(sshConnection);
            } catch (err) {
                console.error("Reconnection attempt failed. Retrying in 5 seconds:", err);
                setTimeout(tryReconnect, 5000); // Reintentar en caso de fallo
            } finally {
                isConnecting = false;
            }
        };

        tryReconnect();
    });

    return connectionPromise;
}

async function ensureConnection() {
    if (!sshConnection) {
        console.warn("SSH connection is not active. Waiting for reconnection...");
        await reconnect(); // Esperar reconexión antes de continuar
    }
    return sshConnection;
}

function getSSHClient() {
    if (!sshConnection) {
        throw new Error("SSH connection has not been established. Call initializeConnection first.");
    }
    return sshConnection;
}

module.exports = {
    initializeConnection,
    ensureConnection, // Nuevo método para garantizar la conexión antes de cualquier operación
    getSSHClient,
};