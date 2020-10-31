var ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
var hackables = new Map();
var currentHackableId;

const states = { 
  CONNECT: 'connect',
  CONNECTING: 'connecting',
  MENU: 'menu',
  PUZZLE: 'puzzle'
}

var state = {
  state,

  set current(newState){

    this.state = newState;

    document.querySelector('#connect').hidden = !(this.state == states.CONNECT);
    document.querySelector('#navigator').hidden = !(this.state == states.MENU);
    document.querySelector('#back-button').hidden = !(this.state == states.PUZZLE);
    document.querySelector('#waiting-for-start').hidden = !(this.state == states.CONNECTING);

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

  state.current = states.MENU;

  ws.send(JSON.stringify({messageType: currentHackableId + '_DESELECTED'}));
}

function selectPuzzle(puzzleId){
  selectHackable(puzzleId);

  ws.send(JSON.stringify({messageType: puzzleId + '_SELECTED'}));
}

function missionStarted() {

  state.current = states.MENU;
}

ws.addEventListener('open', function(event){
  console.log('Connection opened!');
});

ws.addEventListener('message', (message) => {

  var webAppMessage = JSON.parse(message.data);

  if (webAppMessage.messageType == "JOINED_ROOM"){
    
    document.querySelector('#connect').hidden = true;
    document.querySelector('#waiting-for-start').hidden = false;

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