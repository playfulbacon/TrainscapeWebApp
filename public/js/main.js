document.addEventListener("DOMContentLoaded", function(event) {     

      document.querySelector('#navigator').style.display = "none";
      document.querySelector('#back-button').style.display = "none";
      document.querySelector('#waiting-for-start').style.display = "none";

      ws.addEventListener('open', function(event){
        console.log('Connection opened!');
      });

      ws.addEventListener('message', (message) => {

        var webAppMessage = JSON.parse(message.data);

        if (webAppMessage.messageType == "JOINED_ROOM"){
          
          document.querySelector('#connect').style.display = "none";
          document.querySelector('#waiting-for-start').style.display = "block";

          var message = {
            messageType: 'WEB_APP_PLAYER_JOINED',
          };
          ws.send(JSON.stringify(message));
        }

        if (webAppMessage.messageType == "MISSION_STARTED"){
          missionStarted();
        }

        if (webAppMessage.messageType == "WAGON_ENTERED"){
          document.querySelector('#wagon-name').innerHTML = webAppMessage.data;

          hackables.forEach(hackable => {
            hackable.hideNavigatorButton();
          });
        }
      });

      ws.addEventListener('close', function(event){
        ws = null;
      });

      document.querySelector('#back-button').addEventListener('click', () => {
        returnToNavigator();
      });

      document.querySelector('#connect-button').addEventListener('click', () => {
        var roomCode =  document.querySelector('#room-code-input').value.toLowerCase();

        if (roomCode == "test"){
          missionStarted();

          // show all hackables when testing
          hackables.forEach(hackable => {
            hackable.showNavigatorButton();
          });

          return;
        }

        var joinRequest = {
            messageType: 'ROOM_JOIN_REQUEST',
            data: roomCode
        };

        ws.send(JSON.stringify(joinRequest));
      });

      function showMessage(message) {
        messages.textContent = message + "\n\n" + messages.textContent;
        messages.scrollTop = messages.scrollHeight;
      }
    });