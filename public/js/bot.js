class Bot{
  
    constructor(puzzleId){
  
        this.botInfo = ["-EMPTY-","-EMPTY-","-EMPTY-","-EMPTY-"];

        ws.addEventListener('message', (event) => {
            var webAppMessage = JSON.parse(event.data);
            if (webAppMessage.messageType == puzzleId + "_SETUP"){
              var webAppSetup = JSON.parse(webAppMessage.data);
              this.botInfo = webAppSetup.botInfo;
            }
        });  
        
        var btn = newNavigatorButton(puzzleId);
        btn.addEventListener('click', () => {

            //folder contents
            var data = document.getElementsByClassName("data");
            for (var i = 0; i < data.length; i++) {
                data[i].innerHTML = this.botInfo[i];
            }
            
            //collapse all folders
            var folders = document.getElementsByClassName("content");
            for (var i = 0; i < folders.length; i++) {
                folders[i].style.display = "none";
            }
            
            selectHackable("bot"); //index.html function
        });
    }
}
  
// https://stackoverflow.com/questions/52342244/javascript-variable-is-not-defined

// https://www.w3schools.com/howto/howto_js_collapsible.asp
