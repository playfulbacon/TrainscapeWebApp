var puzzleLuggageComboLock = new Puzzle("PUZZLE_LUGGAGECOMBOLOCK", "./html/puzzle-luggage-combo-lock.html", 

    function (webAppSetup) {

        //generate list display by iterating through lists of luggage tags and security hints
        for (var index = 0; index < webAppSetup.luggageTags.length; index++)
        {
            //luggage tag
            var tag = document.createElement("P");
            tag.setAttribute('id', "tag-" + index);
            tag.innerHTML = "<br>LUGGAGE TAG: " + webAppSetup.luggageTags[index];
            document.querySelector('#div-luggage').appendChild(tag);
    
            //security question hint
            var hint = document.createElement("P");
            hint.setAttribute('id', "hint-" + index);
            hint.innerHTML = "SECURITY QUESTION: " + webAppSetup.luggageHints[index];
            document.querySelector('#div-luggage').appendChild(hint);
    
            //input field
            var input = document.createElement("INPUT");
            input.setAttribute('id', "input-" + index);
            input.placeholder = "ENTER PASSCODE";
            input.style = "text-transform:uppercase";
            document.querySelector('#div-luggage').appendChild(input);

            //send button
            var button = document.createElement("BUTTON");
            button.setAttribute('id', "button-" + index);
            button.setAttribute('class', "connect-button");
            button.innerHTML = "SEND";
            button.addEventListener('click', function()
            {
                //webAppSetup.luggageTags[index],
                //document.getElementById('#input-' + index).value.toUpperCase
                var webAppData = {
                    luggageTag: "982",
                    passcode: "fudge"
                }
        
                puzzleLuggageComboLock.sendData(webAppData);
            });
            document.querySelector('#div-luggage').appendChild(button);

            //response lock state
            var response = document.createElement("P");
            response.setAttribute('id', "response-" + index);
            response.innerHTML = "LOCKED";
            document.querySelector('#div-luggage').appendChild(response);
        }

    },

    function(webAppResponse){

        var message = "LOCKED";

        if (webAppResponse.unlocked)
        {
            message = "UNLOCKED"
        }

        //update locked state for luggage
        document.getElementById('#response-' + webAppResponse.luggageIndex).innerHTML = message;
    }
);