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

var owen = new Bot("OWEN");
var darcy = new Bot("DARCY");
var harriet = new Bot("HARRIET");
var francesca = new Bot("FRANCESCA");
var brock = new Bot("BROCK");
var finley = new Bot("FINLEY");
var cash = new Bot("CASH");
var frederick = new Bot("FREDERICK");
var oliver = new Bot("OLIVER");
var rosalind = new Bot("ROSALIND");
