fetch("./html/bot.html")
.then((response) => {
    return response.text();
})
.then((body) => {
    var div = document.createElement('div');
    div.setAttribute('id', "bot");
    div.innerHTML = body;
    div.style.display = "none";
    document.querySelector('#game-content').appendChild(div);
});

var owen = new Bot("BOT_OWEN");
var darcy = new Bot("BOT_DARCY");
var harriet = new Bot("BOT_HARRIET");
var francesca = new Bot("BOT_FRANCESCA");
var brock = new Bot("BOT_BROCK");
//var finley = new Bot("BOT_FINLEY");
//var cash = new Bot("BOT_CASH");
//var frederick = new Bot("BOT_FREDERICK");
//var constable = new Bot("BOT_CONSTABLE");