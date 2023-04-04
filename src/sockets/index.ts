import * as WebSocket from 'ws';
import fs from 'node:fs';
const port = 8080;
const server = new WebSocket.Server({ port: port });
const helpers = fs.readdirSync('dist/sockets/helpers');

server.on('connection', socket => {
    socket.send(JSON.stringify({
        message: 'Connected to the server. Welcome aboard!'
    }));
    
    socket.on('message', async message => {
        let data = JSON.parse(message.toString());
        let action = data.action;

        if (helpers.includes(`${action}.js`)) {
            require(`./helpers/${action}`)(data, socket)
        } else {
            socket.send(JSON.stringify({
                error: true,
                message: 'Invalid action'
            }))
        };
    });
});

console.log(`[WSS] Initialized on localhost:${port}`)
fs.readdirSync('dist/sockets/helpers').forEach(file => {
    if (!file.endsWith('.js')) return;
    console.log(`[WSS HELPERS] Loaded ${file}`)
});