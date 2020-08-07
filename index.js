'use strict';

const WebSocket = require('ws');
const server = require('http').createServer();
const app = require('./http-server');

const port = process.env.PORT || 3000;

// Mount our express HTTP router into our server
server.on('request', app);
server.listen(port, () => console.log(`Listening on port ${port}`));

// Rooms is a map of room codes to a list of players in that room
const rooms = new Map();
// RoomClients is a map of room codes to the room client itself
const roomClients = new Map();
// Add a test room manually
rooms.set('test', []);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

  ws.room = '';
  ws.name = '';
  ws.inGame = false;

  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (message) => {

    var webAppMessage = JSON.parse(message);

    if (webAppMessage.roomCode)
      ws.room = webAppMessage.roomCode;

    switch (webAppMessage.messageType) {
      case 'CREATE_ROOM_REQUEST': {

        var roomCode = generateRoomCode();
        while (rooms.has(roomCode))
          roomCode = generateRoomCode();

          ws.room = roomCode;

          rooms.set(ws.room, []);
          roomClients.set(ws.room, ws);
          const response = {
              messageType: 'ROOM_CREATED_SUCCESS',
              roomCode: roomCode
          }

          ws.send(JSON.stringify(response));
      }
      break;

      case 'ROOM_JOIN_REQUEST': {
        if (!rooms.has(ws.room)) {
            // Tried to connect to a non-existent room
            const response = {
                messageType: 'ERROR_INVALID_ROOM',
                roomCode: ws.room,
            }
            ws.send(JSON.stringify(response));
        } 
        else {
          ws.inGame = true;
          const players = rooms.get(ws.room);
          players.push({
              client: ws
          });
          rooms.set(ws.room, players);
          const response = {
              messageType: 'PLAYER_JOINED',
              roomCode: ws.room,
          }
          broadcast(JSON.stringify(response));
        }
    }
    break;
    }

  })
});

function generateRoomCode(){
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function broadcast(message) {
  wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
          client.send(message);
      }
  });
}

setInterval(() => {
  wss.clients.forEach((client) => {
    //client.send(new Date().toTimeString());
  });
}, 1000);