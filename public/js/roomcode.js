document.addEventListener("DOMContentLoaded", function(event) {

      var roomCode = '';

      const ws = new WebSocket(location.origin.replace(/^http/, 'ws'));

      ws.onopen = () => {
        console.log('Connection opened!');
      }

      ws.onmessage = (message) => {
        var webAppMessage = JSON.parse(message.data);

        if (webAppMessage.roomCode.toLowerCase() == roomCode){
          showMessage(message.data);
        }
      }

      ws.onclose = function () {
        ws = null;
      }

      const connectBtn = document.querySelector('#connect-button');
      const testBtn = document.querySelector('#test-button');
      const messages = document.querySelector('#messages');

      connectBtn.addEventListener('click', function(){
        console.log("connect button pressed");

        roomCode =  document.querySelector('#roomCode').value.toLowerCase();
        var joinRequest = {
            messageType: 'ROOM_JOIN_REQUEST',
            roomCode: roomCode,
        };

        ws.send(JSON.stringify(joinRequest));
      });

      testBtn.addEventListener('click', function(){
        console.log("test button pressed");

        var test = {
            messageType: 'TEST',
            roomCode: roomCode,
        };

        ws.send(JSON.stringify(test));
      });

      function showMessage(message) {
        messages.textContent += `\n\n${message}`;
        messages.scrollTop = messages.scrollHeight;
      }

    });