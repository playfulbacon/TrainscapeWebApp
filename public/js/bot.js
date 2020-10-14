class Bot{
  
    constructor(puzzleId){
  
        this.botInfo = "default bot data";

        ws.addEventListener('message', (event) => {
            var webAppMessage = JSON.parse(event.data);
            if (webAppMessage.messageType == puzzleId + "_SETUP"){
              var webAppSetup = JSON.parse(webAppMessage.data);
              print("Bot Setup: " + webAppSetup);
              this.botInfo = webAppSetup.botInfo;
            }
        });  
        
        var btn = newNavigatorButton(puzzleId);
        btn.addEventListener('click', () => {
            document.querySelector('#bot-info').innerHTML = this.botInfo;
            selectHackable("bot"); //index.html function
        });
    }
}
  
// https://stackoverflow.com/questions/52342244/javascript-variable-is-not-defined