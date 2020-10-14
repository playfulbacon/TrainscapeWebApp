var puzzleLuggageComboLock = new Puzzle("PUZZLE_LUGGAGECOMBOLOCK", "./html/puzzle-luggage-combo-lock.html", 

    function (webAppSetup) {

        //store luggage tags / hints for reference when entering tag serial code to find luggage to hack
        var luggageAllTags = webAppSetup.luggageAllTags;
        var luggagePuzzleTags = webAppSetup.luggagePuzzleTags;
        var luggagePuzzleHints = webAppSetup.luggagePuzzleHints;
        var currentLookupTag = -1;

        //start with below inputs hidden
        document.querySelector("#input-luggage-code").value = "";
        document.querySelector("#input-luggage-code").style.display = "none";
        document.querySelector("#button-send-code").style.display = "none";


        //search for matching luggage tag id to show security question / input field for entering passcode
        document.querySelector("#button-search-id").addEventListener('click', function()
        {
            //if there is a search result
            if (luggageAllTags.includes(document.querySelector("#input-serial-id").value))
            {
                currentLookupTag = luggageAllTags.indexOf(document.querySelector("#input-serial-id").value);

                //check if has puzzle associated with tag
                if (luggagePuzzleTags.includes(document.querySelector("#input-serial-id").value))
                {
                    //show security question, input field, send button
                    document.querySelector("#result-search").innerHTML = luggagePuzzleHints[currentLookupTag];
                    document.querySelector("#input-luggage-code").value = "";
                    document.querySelector("#input-luggage-code").style.display = "block";
                    document.querySelector("#button-send-code").style.display = "block";
                    document.querySelector("#response").innerHTML = "";
                }
                else
                {
                    //hide security question, input field, send button
                    document.querySelector("#result-search").innerHTML = "- ACCESS DENIED -<br>- HIGH LEVEL ENCRYPTION -";
                    document.querySelector("#input-luggage-code").value = "";
                    document.querySelector("#input-luggage-code").style.display = "none";
                    document.querySelector("#button-send-code").style.display = "none";
                }
            }
            else
            {
                //hide security question, input field, send button
                document.querySelector("#result-search").innerHTML = "- NO RESULTS -";
                document.querySelector("#input-luggage-code").value = "";
                document.querySelector("#input-luggage-code").style.display = "none";
                document.querySelector("#button-send-code").style.display = "none";
            }
        });


        //send luggage passcode and associated tag id to unity for unlocking
        document.querySelector("#button-send-code").addEventListener('click', function()
        {
            var webAppData = {
                luggageTag: luggageAllTags[currentLookupTag],
                passcode: document.querySelector("#input-luggage-code").value.toUpperCase()
            }
        
            puzzleLuggageComboLock.sendData(webAppData);
        });

        //OLD SETUP TO SHOW MULTIPLE LUGGAGE INPUT FIELDS FOR EACH LUGGAGE
        //generate list display by iterating through lists of luggage tags and security hints
        /*for (var index = 0; index < webAppSetup.luggagePuzzleTags.length; index++)
        {
            //luggage tag
            var tag = document.createElement("P");
            tag.setAttribute('id', "tag-" + index);
            tag.innerHTML = "<br>LUGGAGE TAG: " + webAppSetup.luggagePuzzleTags[index];
            document.querySelector('#div-luggage').appendChild(tag);
    
            //security question hint
            var hint = document.createElement("P");
            hint.setAttribute('id', "hint-" + index);
            hint.innerHTML = "SECURITY QUESTION: " + webAppSetup.luggagePuzzleHints[index];
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
                //webAppSetup.luggagePuzzleTags[index],
                //document.querySelector('#input-' + index).value.toUpperCase()
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
        }*/

    },

    function(webAppResponse){

        var message = "LOCKED";

        if (webAppResponse.unlocked)
        {
            message = "UNLOCKED"
        }

        document.querySelector("#response").innerHTML = message;
    }
);