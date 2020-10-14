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