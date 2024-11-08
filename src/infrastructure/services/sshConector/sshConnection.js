const { Client } = require('ssh2')
const { readFileSync } = require('fs');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('uptime', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: '192.168.100.100',
    port: 22,
    username: 'frylock',
    privateKey: readFileSync('/path/to/my/key') //.pem
});


//option 2  
function getData() {
    return new Promise((resolve, reject) => {
        let allData = "";
        conn.on('ready', () => {
            conn.exec('pwd', (err, stream) => {
                if (err) {
                    reject(err);
                    conn.end();
                    return;
                }
                stream.on('data', (data) => {
                    allData += data;
                });
                stream.on('close', (code, signal) => {
                    resolve(allData);
                    conn.end();
                });
                stream.on('error', reject);
            });
        }).connect({
            host: 'myserver',
            port: 22,
            username: 'root',
            password: 'roots!'
        });
    });
}


getData().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});;



module.exports = { conn, getData }