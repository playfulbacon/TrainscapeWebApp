document.addEventListener("DOMContentLoaded", function(event) {     

      var currentPageId = '';
      var currentPuzzleId = '';

      document.querySelector('#navigator').style.display = "none";
      document.querySelector('#machine-door-panel').style.display = "none";
      document.querySelector('#machine-storage-box').style.display = "none";
      document.querySelector('#machine-drink-dispenser').style.display = "none";
      document.querySelector('#back-button').style.display = "none";
      document.querySelector('#waiting-for-start').style.display = "none";

      ws.addEventListener('open', function(event){
        console.log('Connection opened!');
      });

      ws.addEventListener('message', function(message){
        console.log('message received');

        var webAppMessage = JSON.parse(message.data);

        if (webAppMessage.roomCode.toLowerCase() == roomCode){
          showMessage(message.data);
        }

        if (webAppMessage.messageType == "JOINED_ROOM"){
          
          document.querySelector('#connect').style.display = "none";
          document.querySelector('#waiting-for-start').style.display = "block";

          var message = {
            messageType: 'WEB_APP_PLAYER_JOINED',
            roomCode: roomCode,
          };
          ws.send(JSON.stringify(message));
        }

        if (webAppMessage.messageType == "MISSION_STARTED"){
          document.querySelector('#waiting-for-start').style.display = "none";
          document.querySelector('#navigator').style.display = "block";
        }
      });

      ws.addEventListener('close', function(event){
        ws = null;
      });

      const connectBtn = document.querySelector('#connect-button');
      const testBtn = document.querySelector('#test-button');
      const messages = document.querySelector('#messages');

      //TODO: dynamically create these buttons and add click event listeners in puzzle.js
      const machineDoorPanelButton = document.querySelector('#machine-door-panel-button');
      const machineStorageBoxButton = document.querySelector('#machine-storage-box-button');
      const machineDrinkDispenserButton = document.querySelector('#machine-drink-dispenser-button');

      document.querySelector('#back-button').addEventListener('click', function(){
        document.querySelector('#navigator').style.display = "block";
        document.querySelector(currentPageId).style.display = "none";
        document.querySelector('#back-button').style.display = "none";

        ws.send(JSON.stringify({messageType: currentPuzzleId + '_DESELECTED', roomCode: roomCode}));
      });

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

      // TODO: create selectPuzzle function, hook up to dynamically created buttons from puzzle.js
      machineDoorPanelButton.addEventListener('click', function(){

        document.querySelector('#navigator').style.display = "none";
        document.querySelector('#machine-door-panel').style.display = "block";
        document.querySelector('#back-button').style.display = "block";
        currentPageId = '#machine-door-panel';

        currentPuzzleId = 'DOOR_PANEL';
        ws.send(JSON.stringify({messageType: currentPuzzleId + '_SELECTED', roomCode: roomCode}));
      });

      machineStorageBoxButton.addEventListener('click', function(){

        document.querySelector('#navigator').style.display = "none";
        document.querySelector('#machine-storage-box').style.display = "block";
        document.querySelector('#back-button').style.display = "block";
        currentPageId = '#machine-storage-box';

        currentPuzzleId = 'STORAGE_BOX';
        ws.send(JSON.stringify({messageType: currentPuzzleId + '_SELECTED', roomCode: roomCode}));
      });

      machineDrinkDispenserButton.addEventListener('click', function(){

        document.querySelector('#navigator').style.display = "none";
        document.querySelector('#machine-drink-dispenser').style.display = "block";
        document.querySelector('#back-button').style.display = "block";
        currentPageId = '#machine-drink-dispenser';

        currentPuzzleId = 'DRINK_DISPENSER';
        ws.send(JSON.stringify({messageType: currentPuzzleId + '_SELECTED', roomCode: roomCode}));
      });

      function showMessage(message) {
        messages.textContent = message + "\n\n" + messages.textContent;
        messages.scrollTop = messages.scrollHeight;
      }
    });