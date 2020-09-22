document.addEventListener("DOMContentLoaded", function(event) {     

      var currentPageId = '';
      var currentPuzzleId = '';

      const testBtn = document.querySelector('#test-button');
      const messages = document.querySelector('#messages');

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

        var webAppMessage = JSON.parse(message.data);

        //showMessage(message.data);

        if (webAppMessage.messageType == "JOINED_ROOM"){
          
          document.querySelector('#connect').style.display = "none";
          document.querySelector('#waiting-for-start').style.display = "block";

          var message = {
            messageType: 'WEB_APP_PLAYER_JOINED',
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

      document.querySelector('#back-button').addEventListener('click', function(){
        document.querySelector('#navigator').style.display = "block";
        document.querySelector(currentPageId).style.display = "none";
        document.querySelector('#back-button').style.display = "none";

        ws.send(JSON.stringify({messageType: currentPuzzleId + '_DESELECTED'}));
      });

      document.querySelector('#connect-button').addEventListener('click', function(){
        var roomCode =  document.querySelector('#room-code-input').value.toLowerCase();
        var joinRequest = {
            messageType: 'ROOM_JOIN_REQUEST',
            data: roomCode
        };

        ws.send(JSON.stringify(joinRequest));
      });

      testBtn.addEventListener('click', function(){
        console.log("test button pressed");

        var test = {
            messageType: 'TEST',
        };

        ws.send(JSON.stringify(test));
      });

      // TODO: create selectPuzzle function, hook up to dynamically created buttons from puzzle.js
      // TODO: dynamically create these buttons and add click event listeners in puzzle.js
      const machineDoorPanelButton = document.querySelector('#machine-door-panel-button');
      const machineStorageBoxButton = document.querySelector('#machine-storage-box-button');
      const machineDrinkDispenserButton = document.querySelector('#machine-drink-dispenser-button');

      machineDoorPanelButton.addEventListener('click', function(){
        selectPuzle('DOOR_PANEL', '#machine-door-panel');
      });

      machineStorageBoxButton.addEventListener('click', function(){
        selectPuzle('STORAGE_BOX', '#machine-storage-box');
      });

      machineDrinkDispenserButton.addEventListener('click', function(){
        selectPuzle('DRINK_DISPENSER', '#machine-drink-dispenser');
      });

      function selectPuzle(puzzleId, pageId){
        document.querySelector('#navigator').style.display = "none";
        document.querySelector(pageId).style.display = "block";
        document.querySelector('#back-button').style.display = "block";

        currentPageId = pageId;
        currentPuzzleId = puzzleId;

        ws.send(JSON.stringify({messageType: currentPuzzleId + '_SELECTED'}));
      }

      function showMessage(message) {
        messages.textContent = message + "\n\n" + messages.textContent;
        messages.scrollTop = messages.scrollHeight;
      }
    });