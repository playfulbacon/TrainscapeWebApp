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
      const testPuzzleBtn = document.querySelector('#test-puzzle-button');
      const testCssBtn = document.querySelector('#test-css-button');

      connectBtn.addEventListener('click', function(){
        console.log("connect button pressed");

        roomCode =  document.querySelector('#room-code-input').value.toLowerCase();
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

      testPuzzleBtn.addEventListener('click', function(){

        fetch('/testPuzzle.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
              initializeTestPuzzle();
          });
      });

      testCssBtn.addEventListener('click', function(){

        fetch('/cssTest.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
          });
      });

      function showMessage(message) {
        messages.textContent = message + "\n\n" + messages.textContent;
        messages.scrollTop = messages.scrollHeight;
      }

      function puzzleButtonPressed(index){
        var webAppData = {
          buttonIndex: index
        }

        var buttonPressedMessage = {
            messageType: 'TEST_PUZZLE_BUTTON_PRESSED',
            roomCode: roomCode,
            data: JSON.stringify(webAppData)
        };

        ws.send(JSON.stringify(buttonPressedMessage));
      }

      // Once the HTML for the puzzle has loaded, set up listeners
      function initializeTestPuzzle() {
        console.log("initialize puzzle");

        for(let i = 0; i < 9; i++){
          document.querySelector('#puzzle-button-' + i).addEventListener('click',function(){puzzleButtonPressed(i)});
        }
      }

    });