fetch("./html/bot.html")
.then((response) => {
    return response.text();
})
.then((body) => {
    var div = document.createElement('div');
    div.setAttribute('id', "bot");
    div.innerHTML = body;

    div.hidden = true;

    document.querySelector('#game-content').appendChild(div);

    //folder structure setup
    var collapsibles = document.getElementsByClassName("collapsible");
    for (var i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", function () {
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});

var owen = new Bot("BOT_OWEN");
var darcy = new Bot("BOT_DARCY");
var harriet = new Bot("BOT_HARRIET");
var francesca = new Bot("BOT_FRANCESCA");
var brock = new Bot("BOT_BROCK");
var finley = new Bot("BOT_FINLEY");
var cash = new Bot("BOT_CASH");
var frederick = new Bot("BOT_FREDERICK");
var frederick = new Bot("BOT_OLIVER");
var rosalind = new Bot("BOT_ROSALIND");