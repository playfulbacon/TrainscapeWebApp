var drinkDispenserPuzzle = new Puzzle("DRINK_DISPENSER", "Drink Dispenser", "./html/puzzle-drink-dispenser.html", 

    function (webAppSetup) {
    
        //var drinkRecipes = webAppSetup.drinkRecipes;       
        //document.querySelector('#drink-recipes').innerHTML = drinkRecipes;

        var canisterNames = webAppSetup.canisterNames;
        
        for (let index = 0; index < canisterNames.length; index++)
        {
            var button = document.createElement("BUTTON");
            button.setAttribute('id', "dispenser-button-" + index);
            button.setAttribute('class', "dispenser-buttons");
            button.innerHTML = canisterNames[index];
            button.addEventListener("click", function () {
                var webAppData = {
                    buttonIndex: index
                }
                drinkDispenserPuzzle.sendData(webAppData);
            });

            var tableColumn = document.createElement("TD");
            tableColumn.setAttribute('id', "dispenser-button-" + index);
            tableColumn.appendChild(button);
            document.querySelector('#dispenser-buttons').appendChild(tableColumn);
        }

    },

    // response callback
    function(webAppResponse){

    },

    // input callback
    function(webAppInput){

        var canisterNames = webAppInput.canisterNames;
        
        var dispenserButtons = document.getElementsByClassName("dispenser-buttons");

        for (let index = 0; index < dispenserButtons.length; index++)
        {
            dispenserButtons[index].innerHTML = canisterNames[index];
        }

    }
);