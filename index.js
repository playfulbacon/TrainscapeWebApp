'use strict';

const express = require('express');
const WebSocket = require('ws');
const server = require('http').createServer();
const app = require('./http-server');

const port = process.env.PORT || 3000;

// Mount our express HTTP router into our server
server.on('request', app);
server.listen(port, () => console.log(`Free Radish is listening on port ${port}`));

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
});

setInterval(() => {
  wss.clients.forEach((client) => {
    //client.send(new Date().toTimeString());
  });
}, 1000);