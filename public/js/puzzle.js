class Puzzle{
  
  constructor(puzzleId, setupCallback){

    this.puzzleId = puzzleId;

    ws.addEventListener('message', function(event){
      var webAppMessage = JSON.parse(event.data);
      if (webAppMessage.messageType == puzzleId + "_SETUP"){
        var webAppSetup = JSON.parse(webAppMessage.data);
        setupCallback(webAppSetup);
      }
    });    

    //TODO: add button to html that represents puzzle with naming convention using puzzleId

    //TODO: add puzzle to dictionary that uses id as a key, use dictionary to show / hide puzzles on mission setup
    puzzles.set(puzzleId, this);
  }

  sendData = function(data){
    
    var webAppMessage = {
        messageType: this.puzzleId + '_DATA',
        roomCode: roomCode,
        data: JSON.stringify(data)
    };

    ws.send(JSON.stringify(webAppMessage));
  }
}