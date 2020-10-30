class Hackable{

    id = 'NONE';
    unlocked = true;
    navigatorButton;

    constructor(id) {
        this.id = id;
        hackables.set(this.id, this);

        ws.addEventListener('message', (event) => {
            var webAppMessage = JSON.parse(event.data);
            if (webAppMessage.messageType == this.id + "_WAGON_ENTERED"){
                this.enterWagon();
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

    enterWagon() {
        if (this.unlocked)
            this.showNavigatorButton();
    }

    hideNavigatorButton() {
        console.log('hide hackable: ' + this.id);

        this.navigatorButton.style.display = "none";
        //document.querySelector('#' + this.id + "-navigator-button").style.display = "none";
    }
    
    showNavigatorButton() {
        console.log('show hackable: ' + this.id);

        this.navigatorButton.style.display = "block";
        //document.querySelector('#' + this.id + "-navigator-button").style.display = "block";
    }

    createNavigatorButton() {
        var btn = document.createElement("BUTTON");
        btn.setAttribute('id', this.id + "-navigator-button");
        btn.innerHTML = this.id;
        document.querySelector('#navigator-buttons').appendChild(btn);
        btn.style.display = "none";
        this.navigatorButton = btn;
        return btn;
    }
}