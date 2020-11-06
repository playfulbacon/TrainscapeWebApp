var ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
var hackables = new Map();
var currentHackableId;
var puzzleGroups;

const states = { 
  CONNECT: 'connect',
  CONNECTING: 'connecting',
  HACKABLES: 'hackables',
  PUZZLE: 'puzzle'
}

var state = {
  state,

  set current(newState){

    this.state = newState;

    document.querySelector('#STATE_CONNECT').hidden = !(this.state == states.CONNECT);
    document.querySelector('#STATE_CONNECTING').hidden = !(this.state == states.CONNECTING);
    document.querySelector('#STATE_HACKABLES').hidden = !(this.state == states.HACKABLES);
    document.querySelector('#back-button').hidden = !(this.state == states.PUZZLE);

    console.log("state set to: " + this.state);
  }
};

state.current = states.CONNECT;

function selectHackable(id){

  document.querySelector('#' + id).hidden = false;
  currentHackableId = id;

  state.current = states.PUZZLE;
}

function returnToNavigator(){

  document.querySelector('#' + currentHackableId).hidden = true;

  state.current = states.HACKABLES;

  ws.send(JSON.stringify({messageType: currentHackableId + '_DESELECTED'}));
}

function selectPuzzle(puzzleId){
  selectHackable(puzzleId);

  ws.send(JSON.stringify({messageType: puzzleId + '_SELECTED'}));
}

function missionStarted() {
  console.log("mission started");

  state.current = states.HACKABLES;
}

ws.addEventListener('open', function(event){
  console.log('Connection opened!');
});

ws.addEventListener('message', (event) => {

  var webAppMessage = JSON.parse(event.data);

  if (webAppMessage.messageType == "JOINED_ROOM"){
    
    state.current = states.CONNECTING;

    var message = {
      messageType: 'WEB_APP_PLAYER_JOINED',
    };

    ws.send(JSON.stringify(message));
  }

  if (webAppMessage.messageType == "MISSION_STARTED"){
    var missionSetupData = JSON.parse(webAppMessage.data);
    puzzleGroups = missionSetupData.puzzleGroups;
    missionStarted();
  }

  if (webAppMessage.messageType == "WAGON_ENTERED"){
    var wagonIndex = parseInt(webAppMessage.data);

    document.querySelector('#wagon-name').innerHTML = puzzleGroups[wagonIndex].groupName;

    // hide all hackables
    hackables.forEach(hackable => {
      hackable.hideNavigatorButton();
    });

    // show puzzles in current wagon
    var puzzleIds = puzzleGroups[wagonIndex].puzzleIds;

    puzzleIds.forEach(puzzleId => {
      hackables.get(puzzleId).groupEntered();
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
  console.log("connect button pressed");

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