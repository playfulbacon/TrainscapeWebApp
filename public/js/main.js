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

        if (webAppMessage.messageType == "DOOR_PANEL_SETUP"){
          setupDoorPanel(JSON.parse(webAppMessage.data));
        }

        /*
        if (webAppMessage.messageType == "STORAGE_BOX_SETUP"){
          setupStorageBox(JSON.parse(webAppMessage.data));
        }
        */

        if (webAppMessage.messageType == "DRINK_DISPENSER_SETUP"){
          setupDrinkDispenser(JSON.parse(webAppMessage.data));
        }

        if (webAppMessage.messageType == "BARTENDER_BOT_SETUP"){
          setupBartenderBot(JSON.parse(webAppMessage.data));
        }

        if (webAppMessage.messageType == "GUARD_BOT_SETUP"){
          setupGuardBot(JSON.parse(webAppMessage.data));
        }
      });

      ws.addEventListener('close', function(event){
        ws = null;
      });

      const connectBtn = document.querySelector('#connect-button');
      const testBtn = document.querySelector('#test-button');
      const messages = document.querySelector('#messages');
      const machineDoorPanelButton = document.querySelector('#machine-door-panel-button');
      const machineStorageBoxButton = document.querySelector('#machine-storage-box-button');
      const machineDrinkDispenserButton = document.querySelector('#machine-drink-dispenser-button');
      const botGuardButton = document.querySelector('#bot-guard-button');
      const botBartenderButton = document.querySelector('#bot-bartender-button');
      const testCssBtn = document.querySelector('#test-css-button');

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

      function doorPanelButtonPressed(index){
        var webAppData = {
          buttonIndex: index
        }

        var message = {
            messageType: 'DOOR_PANEL_DATA',
            roomCode: roomCode,
            data: JSON.stringify(webAppData)
        };

        ws.send(JSON.stringify(message));
      }

      function setupDoorPanel(webAppSetup){
        
        var answerSequence = webAppSetup.answerSequence;
        
        for(let i = 0; i < webAppSetup.buttonRows * webAppSetup.buttonCols; i++){
          document.querySelector('#panel-button-' + i).addEventListener('click',function(){doorPanelButtonPressed(i)});
          document.querySelector('#panel-button-' + i).innerHTML = webAppSetup.puzzleInputs[i].symbolIndex;
        }

        for(var i = 0; i < answerSequence.length; i++){
          document.querySelector('#answer-' + i).innerHTML = answerSequence[i].symbolIndex;
          document.querySelector('#answer-' + i).style.color = "#" + webAppSetup.colors[answerSequence[i].colorIndex];
        }

      }

      function setupStorageBox(webAppSetup){
        
        var trainID = "Train Number: " + webAppSetup.trainID;
        document.querySelector('#train-ID').innerHTML = trainID;
        document.querySelector('#storage-box-button').addEventListener('click',function()
        {
          var webAppData = {
            code: document.querySelector('#storage-box-input').value.toLowerCase()
          }
  
          var message = {
              messageType: 'STORAGE_BOX_DATA',
              roomCode: roomCode,
              data: JSON.stringify(webAppData)
          };
  
          ws.send(JSON.stringify(message));
        });
      }

      function setupDrinkDispenser(webAppSetup){    
        var drinkRecipes = webAppSetup.drinkRecipes;       
        document.querySelector('#drink-recipes').innerHTML = drinkRecipes;

        for(let i = 0; i < 6; i++){
          document.querySelector('#drink-button-' + i).addEventListener('click',function(){drinkDispenserButtonPressed(i)});
        }
      }

      function setupBartenderBot(webAppSetup){
        var drinkRecipes = webAppSetup.drinkRecipes;       
        document.querySelector('#drink-recipes').innerHTML = drinkRecipes;
      }

      function setupGuardBot(webAppSetup){
        var answerSequence = webAppSetup.answerSequence;

        for(var i = 0; i < answerSequence.length; i++){
          document.querySelector('#answer-' + i).innerHTML = answerSequence[i].symbolIndex;
          document.querySelector('#answer-' + i).style.color = "#" + webAppSetup.colors[answerSequence[i].colorIndex];
        }
      }

      function drinkDispenserButtonPressed(index){
        var webAppData = {
          buttonIndex: index
        }

        var message = {
            messageType: 'DRINK_DISPENSER_DATA',
            roomCode: roomCode,
            data: JSON.stringify(webAppData)
        };

        ws.send(JSON.stringify(message));
      }

    });