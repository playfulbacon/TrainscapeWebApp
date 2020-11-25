class Hackable{

    id = 'NONE';
    unlocked = true;
    navigatorContainer;
    navigatorButton;
    persistent = false;
    displayName = 'DISPLAY NAME';

    constructor(id) {
        
        this.id = id;
        this.displayName = id;

        hackables.set(this.id, this);

        ws.addEventListener('message', (event) => {
            var webAppMessage = JSON.parse(event.data);
            if (webAppMessage.messageType == this.id + "_WAGON_ENTERED"){
                this.groupEntered();
            }

            if (webAppMessage.messageType == this.id + "_UNLOCK"){
                this.unlockHackable();
            }
        });    

        this.createNavigatorButton();
    }

    unlockHackable(){
        this.unlocked = true;
        this.showNavigatorButton();
    }

    groupEntered() {
        if (this.unlocked)
            this.showNavigatorButton();
    }

    hideNavigatorButton() {
        this.navigatorContainer.hidden = true;
    }
    
    showNavigatorButton() {
        this.navigatorContainer.hidden = false;
    }

    setDisplayName(displayName){
        this.displayName = displayName;
        this.navigatorButton.innerHTML = displayName; 
    }

    createNavigatorButton() {
        var button = document.createElement("BUTTON");

        var navigatorButtonsDiv = document.getElementById("navigator-buttons");
        navigatorButtonsDiv.appendChild(button);
        
        this.navigatorContainer = button;
        this.navigatorButton = button;

        //this.hideNavigatorButton();
    }
}