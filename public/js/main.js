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

        if (webAppMessage.messageType == "PUZZLE_SETUP"){
          setupTestPuzzle(JSON.parse(webAppMessage.data));
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
              requestPuzzleSetup();
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
            messageType: 'PUZZLE_BUTTON_PRESSED',
            roomCode: roomCode,
            data: JSON.stringify(webAppData)
        };

        ws.send(JSON.stringify(buttonPressedMessage));
      }

      // Once the HTML for the puzzle has loaded, set up listeners
      function requestPuzzleSetup() {

        var test = {
          messageType: 'REQUEST_PUZZLE_SETUP',
          roomCode: roomCode,
        };

        ws.send(JSON.stringify(test));
      }

      function setupTestPuzzle(webAppSetup){
        
        var answerSequence = webAppSetup.answerSequence;

        for(var i = 0; i < answerSequence.length; i++){
          document.querySelector('#answer-' + i).innerHTML = answerSequence[i].symbolIndex;
          document.querySelector('#answer-' + i).style.color = "#" + webAppSetup.colors[answerSequence[i].colorIndex];
        }
        
        for(let i = 0; i < webAppSetup.buttonRows * webAppSetup.buttonCols; i++){
          document.querySelector('#puzzle-button-' + i).addEventListener('click',function(){puzzleButtonPressed(i)});
        }
      }

    });