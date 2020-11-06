class Hackable{

    id = 'NONE';
    unlocked = true;
    navigatorContainer;
    navigatorButton;
    persistent = false;

    constructor(id) {
        
        this.id = id;

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

    createNavigatorButton() {
        var btn = document.createElement("BUTTON");
        btn.innerHTML = this.id;

        var table = document.getElementById("navigator-buttons");
        var row = table.insertRow(0);
        row.setAttribute('id', this.id + "-navigator-button");
        var cell = row.insertCell(0);
        cell.appendChild(btn);

        this.navigatorContainer = row;

        this.navigatorButton = btn;

        //this.hideNavigatorButton();
    }
}