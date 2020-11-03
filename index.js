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

const ignoreRoomCodes = ['test', 'tits', 'jizz', 'fuck', 'shit', 'piss', 'hoes'];

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

  ws.room = '';
  ws.name = '';
  ws.inGame = false;

  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (message) => {

    var webAppMessage = JSON.parse(message);

    switch (webAppMessage.messageType) {
      case 'CREATE_ROOM_REQUEST': {

        var roomCode = generateRoomCode();
        while (rooms.has(roomCode) && !ignoreRoomCodes.has(roomCode))
          roomCode = generateRoomCode();

          ws.room = roomCode;

          rooms.set(ws.room, []);
          roomClients.set(ws.room, ws);
          
          const response = {
              messageType: 'ROOM_CREATED_SUCCESS',
              data: roomCode
          }

          ws.send(JSON.stringify(response)); // send back to client who created the request
      }
      break;

      case 'ROOM_JOIN_REQUEST': {
        ws.room = webAppMessage.data;
        if (!rooms.has(ws.room)) {
            // Tried to connect to a non-existent room
            const response = {
                messageType: 'ERROR_INVALID_ROOM',
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

          const broadcastResponse = {
              messageType: 'PLAYER_JOINED',
          }
          broadcastToOthersInRoom(ws, JSON.stringify(broadcastResponse));

          const response = {
            messageType: 'JOINED_ROOM',
          }
          ws.send(JSON.stringify(response));
        }
    }
    break;

    default: {
      broadcastToOthersInRoom(ws, message);
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

function broadcastToOthersInRoom(ws, message){
  const players = rooms.get(ws.room);

  if (players == undefined)
    return;
    
  players.forEach((player) => {
      if (player.client != ws && player.client.readyState === WebSocket.OPEN) {
          player.client.send(message);
      }
  });  
}

function broadcastToRoom(room, message) {
  const players = rooms.get(room);

  if (players == undefined)
    return;
    
  players.forEach((player) => {
      if (player.client.readyState === WebSocket.OPEN) {
          player.client.send(message);
      }
  });
}

function broadcast(message) {
  wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
          client.send(message);
      }
  });
}

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    console.log('ping');
    ws.ping(function noop(){});
  });
}, 1000);