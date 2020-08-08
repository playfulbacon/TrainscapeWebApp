(function () {

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
      const textBtn = document.querySelector('#test-button');
      const messages = document.querySelector('#messages');
      const roomCodeInput = document.querySelector('#roomCode');

      connectBtn.onclick = function(){
        console.log("connect button pressed");

        roomCode =  document.querySelector('#roomCode').value.toLowerCase();
        var joinRequest = {
            messageType: 'ROOM_JOIN_REQUEST',
            roomCode,
        };

        ws.send(JSON.stringify(joinRequest));
      }

      function showMessage(message) {
        messages.textContent += `\n\n${message}`;
        messages.scrollTop = messages.scrollHeight;
      }

    })();