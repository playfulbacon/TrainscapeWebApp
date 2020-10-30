class Puzzle extends Hackable{
  
  constructor(puzzleId, htmlPath, setupCallback = {}, responseCallback = {}, inputCallback = {}){

    super(puzzleId);

    ws.addEventListener('message', (event) => {
      var webAppMessage = JSON.parse(event.data);
      if (webAppMessage.messageType == this.id + "_SETUP"){
        var webAppSetup = JSON.parse(webAppMessage.data);
        setupCallback(webAppSetup);
      }
      if (webAppMessage.messageType == this.id + "_RESPONSE"){
        var webAppResponse = JSON.parse(webAppMessage.data);
        responseCallback(webAppResponse);
      }
      if (webAppMessage.messageType == this.id + "_INPUT"){
        var webAppInput = JSON.parse(webAppMessage.data);
        inputCallback(webAppInput);
      }
    });    

    // dynamically add puzzle html and navigation button
    if (htmlPath != null){
      fetch(htmlPath)
      .then((response) => {
          return response.text();
      })
      .then((body) => {
          // puzzle html
          var div = document.createElement('div');
          div.setAttribute('id', this.id);
          div.innerHTML = body;
          div.style.display = "none";
          document.querySelector('#game-content').appendChild(div);
  
          // navigation button is created in Hackable constructor 
          this.navigatorButton.addEventListener('click', () => {
            selectPuzzle(this.id); //index.html function
          });
      });
    }
  }

  sendData(){
    
    var webAppMessage = {
        messageType: this.id + '_DATA',
        data: JSON.stringify(data)
    };

    ws.send(JSON.stringify(webAppMessage));
  }
}
