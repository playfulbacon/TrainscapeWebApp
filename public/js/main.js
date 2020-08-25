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

        if (webAppMessage.messageType == "DOOR_PANEL_SETUP"){
          setupDoorPanel(JSON.parse(webAppMessage.data));
        }

        if (webAppMessage.messageType == "STORAGE_BOX_SETUP"){
          setupStorageBox(JSON.parse(webAppMessage.data));
        }
      }

      ws.onclose = function () {
        ws = null;
      }

      const connectBtn = document.querySelector('#connect-button');
      const testBtn = document.querySelector('#test-button');
      const messages = document.querySelector('#messages');
      const machineDoorPanelButton = document.querySelector('#machine-door-panel-button');
      const machineStorageBoxButton = document.querySelector('#machine-storage-box-button');
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

      machineDoorPanelButton.addEventListener('click', function(){
        fetch('/machineDoorPanel.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
              requestDoorPanelSetup();
          });
      });

      machineStorageBoxButton.addEventListener('click', function(){
        fetch('/machineStorageBox.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
              requestStorageBoxSetup();
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

      function doorPanelButtonPressed(index){
        var webAppData = {
          buttonIndex: index
        }

        var message = {
            messageType: 'DOOR_PANEL_BUTTON_PRESSED',
            roomCode: roomCode,
            data: JSON.stringify(webAppData)
        };

        ws.send(JSON.stringify(message));
      }

      // Once the HTML for the puzzle has loaded, set up listeners
      function requestDoorPanelSetup() {

        var test = {
          messageType: 'REQUEST_DOOR_PANEL_SETUP',
          roomCode: roomCode,
        };

        ws.send(JSON.stringify(test));
      }

      function requestStorageBoxSetup() {

        var test = {
          messageType: 'REQUEST_STORAGE_BOX_SETUP',
          roomCode: roomCode,
        };

        ws.send(JSON.stringify(test));
      }

      function setupDoorPanel(webAppSetup){
        
        var answerSequence = webAppSetup.answerSequence;

        for(var i = 0; i < answerSequence.length; i++){
          document.querySelector('#answer-' + i).innerHTML = answerSequence[i].symbolIndex;
          document.querySelector('#answer-' + i).style.color = "#" + webAppSetup.colors[answerSequence[i].colorIndex];
        }
        
        for(let i = 0; i < webAppSetup.buttonRows * webAppSetup.buttonCols; i++){
          document.querySelector('#puzzle-button-' + i).addEventListener('click',function(){doorPanelButtonPressed(i)});
          document.querySelector('#puzzle-button-' + i).innerHTML = webAppSetup.puzzleInputs[i].symbolIndex;
        }
      }

      function setupStorageBox(webAppSetup){
        
        var trainID = "Train ID: " + webAppSetup.trainID;
        document.querySelector('#train-ID').innerHTML = trainID;
        document.querySelector('#storage-box-button').addEventListener('click',function()
        {
          var webAppData = {
            code: document.querySelector('#storage-box-input').value.toLowerCase()
          }
  
          var message = {
              messageType: 'STORAGE_BOX_INPUT',
              roomCode: roomCode,
              data: JSON.stringify(webAppData)
          };
  
          ws.send(JSON.stringify(message));
        });
      }

    });