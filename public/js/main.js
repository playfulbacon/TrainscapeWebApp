var ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
var hackables = new Map();
var currentHackableId;
var puzzleGroups;

const states = { 
  CONNECT: 'connect',
  CONNECTING: 'connecting',
  NAVIGATING: 'navigating',
  HACKING: 'hacking'
}

var state = {
  state,

  set current(newState){

    this.state = newState;

    document.querySelector('#STATE_CONNECT').hidden = !(this.state == states.CONNECT);
    document.querySelector('#STATE_CONNECTING').hidden = !(this.state == states.CONNECTING);
    document.querySelector('#STATE_NAVIGATING').hidden = !(this.state == states.NAVIGATING);
    document.querySelector('#back-button').hidden = !(this.state == states.HACKING);

    console.log("state set to: " + this.state);
  }
};

state.current = states.CONNECT;

function selectHackable(id){

  currentHackableId = id;
  document.querySelector('#' + id).hidden = false;
  document.querySelector('#hackable-title').innerHTML = hackables.get(id).displayName;
  state.current = states.HACKING;
}

function returnToNavigator(){

  document.querySelector('#' + currentHackableId).hidden = true;
  document.querySelector('#hackable-title').innerHTML = "";
  state.current = states.NAVIGATING;

  ws.send(JSON.stringify({messageType: currentHackableId + '_DESELECTED'}));
}

function selectPuzzle(id){
  selectHackable(id);

  ws.send(JSON.stringify({messageType: id + '_SELECTED'}));
}

function missionStarted() {
  console.log("Mission started");

  state.current = states.NAVIGATING;
}

ws.addEventListener('open', function(event){
  console.log('Connection opened');
});

ws.addEventListener('message', (event) => {

  var webAppMessage = JSON.parse(event.data);

  if (webAppMessage.messageType == "JOINED_ROOM"){
    
    state.current = states.CONNECTING;

    var playerData = {
      playerName: document.querySelector('#name-input').value
    }

    var message = {
      messageType: 'WEB_APP_PLAYER_JOINED',
      data: JSON.stringify(playerData)
    };

    ws.send(JSON.stringify(message));
  }

  if (webAppMessage.messageType == "MISSION_STARTED"){
    var missionSetupData = JSON.parse(webAppMessage.data);
    puzzleGroups = missionSetupData.puzzleGroups;
    missionStarted();
  }

  if (webAppMessage.messageType == "WAGON_ENTERED"){
    console.log("Wagon entered");

    var wagonIndex = parseInt(webAppMessage.data);

    document.querySelector('#wagon-name').innerHTML = puzzleGroups[wagonIndex].groupName;

    // hide all hackables
    hackables.forEach(hackable => {
      if (!hackable.persistent)
        hackable.hideNavigatorButton();
    });

    // show puzzles in current wagon
    var puzzleIds = puzzleGroups[wagonIndex].puzzleIds;

    puzzleIds.forEach(id => {
      hackables.get(id).groupEntered(); //TODO: null ref of hackables[id]
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