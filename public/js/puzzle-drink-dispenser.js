var drinkDispenserPuzzle = new Puzzle("DRINK_DISPENSER", function (webAppSetup) {
    drinkDispenserSetup(webAppSetup);
});

function drinkDispenserSetup(webAppSetup){
    var drinkRecipes = webAppSetup.drinkRecipes;       
    document.querySelector('#drink-recipes').innerHTML = drinkRecipes;

    for(let i = 0; i < 6; i++){
        document.querySelector('#drink-button-' + i).addEventListener('click',function()
        {
            var webAppData = {
                buttonIndex: i
            }

            drinkDispenserPuzzle.sendData(webAppData);
        });
    }
}