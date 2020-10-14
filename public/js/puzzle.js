class Puzzle{
  
  constructor(puzzleId, htmlPath, setupCallback, responseCallback){

    this.puzzleId = puzzleId;

    ws.addEventListener('message', function(event){
      var webAppMessage = JSON.parse(event.data);
      if (webAppMessage.messageType == puzzleId + "_SETUP"){
        var webAppSetup = JSON.parse(webAppMessage.data);
        setupCallback(webAppSetup);
      }
      if (webAppMessage.messageType == puzzleId + "_RESPONSE"){
        var webAppResponse = JSON.parse(webAppMessage.data);
        responseCallback(webAppResponse);
      }
    });    

    // dynamically add puzzle html and navigation button
    fetch(htmlPath)
    .then((response) => {
        return response.text();
    })
    .then((body) => {
        // puzzle html
        var div = document.createElement('div');
        div.setAttribute('id', puzzleId);
        div.innerHTML = body;
        div.style.display = "none";
        document.querySelector('#game-content').appendChild(div);

        // navigation button
        var btn = newNavigatorButton(puzzleId);
        btn.addEventListener('click', function(){
          selectPuzzle(puzzleId); //index.html function
        });
    });

    // add puzzle to dictionary that uses id as a key
    // TODO: use dictionary to show / hide puzzles on mission setup
    puzzles.set(puzzleId, this);
  }

  sendData = function(data){
    
    var webAppMessage = {
        messageType: this.puzzleId + '_DATA',
        data: JSON.stringify(data)
    };

    ws.send(JSON.stringify(webAppMessage));
  }
}
