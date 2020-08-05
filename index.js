'use strict';

const express = require('express');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = 'public/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

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