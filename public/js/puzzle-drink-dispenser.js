var drinkDispenserPuzzle = new Puzzle("DRINK_DISPENSER", "Drink Dispenser", "./html/puzzle-drink-dispenser.html", 

    function (webAppSetup) {
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
    },

    function(){}
);