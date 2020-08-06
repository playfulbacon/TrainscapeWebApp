'use strict';

const express = require('express');
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
    ws.room = webAppMessage.roomCode.toLowerCase();

    switch (webAppMessage.messageType) {
      case 'CREATE_ROOM_REQUEST': {
          rooms.set(ws.room, []);
          roomClients.set(ws.room, ws);
          const response = {
              messageType: 'ROOM_CREATED_SUCCESS',
              roomCode: ws.room
          }
          ws.send(JSON.stringify(response));
      }
      break;
    }
    
  })
});

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