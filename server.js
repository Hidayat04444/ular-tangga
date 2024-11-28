const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let players = [];
let currentPlayer = 0;

wss.on('connection', ws => {
    players.push(ws);
    if (players.length === 4) {
        console.log('Game dimulai');
        players.forEach(player => {
            player.send(JSON.stringify({ type: 'start', playerId: players.indexOf(player) + 1 }));
        });
    }

    ws.on('message', message => {
        const data = JSON.parse(message);
        if (data.type === 'roll') {
            // Send roll data to all players
            players.forEach(player => {
                player.send(JSON.stringify({ type: 'roll', roll: data.roll }));
            });
        }
    });

    ws.on('close', () => {
        players = players.filter(player => player !== ws);
    });
});
