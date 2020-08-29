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

        if (webAppMessage.messageType == "DRINK_DISPENSER_SETUP"){
          setupDrinkDispenser(JSON.parse(webAppMessage.data));
        }

        if (webAppMessage.messageType == "BARTENDER_BOT_SETUP"){
          setupBartenderBot(JSON.parse(webAppMessage.data));
        }

        if (webAppMessage.messageType == "GUARD_BOT_SETUP"){
          setupGuardBot(JSON.parse(webAppMessage.data));
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
      const machineDrinkDispenserButton = document.querySelector('#machine-drink-dispenser-button');
      const botGuardButton = document.querySelector('#bot-guard-button');
      const botBartenderButton = document.querySelector('#bot-bartender-button');
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
              
              var test = {
                messageType: 'REQUEST_DOOR_PANEL_SETUP',
                roomCode: roomCode,
              };
      
              ws.send(JSON.stringify(test));
          });
      });

      machineStorageBoxButton.addEventListener('click', function(){
        fetch('/machineStorageBox.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
              
              var test = {
                messageType: 'REQUEST_STORAGE_BOX_SETUP',
                roomCode: roomCode,
              };
      
              ws.send(JSON.stringify(test));
          });
      });

      machineDrinkDispenserButton.addEventListener('click', function(){
        fetch('/machineDrinkDispenser.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
                
              var test = {
                messageType: 'REQUEST_DRINK_DISPENSER_SETUP',
                roomCode: roomCode,
              };

              ws.send(JSON.stringify(test));
          });
      });

      botBartenderButton.addEventListener('click', function(){
        fetch('/bot.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
              
              var test = {
                messageType: 'REQUEST_BARTENDER_BOT_SETUP',
                roomCode: roomCode,
              };
      
              ws.send(JSON.stringify(test));
          });
      });

      
      botGuardButton.addEventListener('click', function(){
        fetch('/bot.html')
          .then((response) => {
              return response.text();
          })
          .then((body) => {
              document.querySelector('#game-content').innerHTML = body;
              
              var test = {
                messageType: 'REQUEST_GUARD_BOT_SETUP',
                roomCode: roomCode,
              };
      
              ws.send(JSON.stringify(test));
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

      function setupDoorPanel(webAppSetup){
        
        var answerSequence = webAppSetup.answerSequence;
        
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

      function setupDrinkDispenser(webAppSetup){    
        for(let i = 0; i < 6; i++){
          document.querySelector('#puzzle-button-' + i).addEventListener('click',function(){drinkDispenserButtonPressed(i)});
        }
      }

      function setupBartenderBot(webAppSetup){
        var drinkRecipes = webAppSetup.drinkRecipes;       
        document.querySelector('#bot-content').innerHTML = drinkRecipes;
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
            messageType: 'DRINK_DISPENSER_BUTTON_PRESSED',
            roomCode: roomCode,
            data: JSON.stringify(webAppData)
        };

        ws.send(JSON.stringify(message));
      }

    });