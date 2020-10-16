var puzzleTrainSettings = new Puzzle("PUZZLE_TRAINSETTINGS", "./html/puzzle-train-settings.html", 

    function (webAppSetup) {

        //setup door codes display and lock/unlock buttons
        for (var i = 0; i < webAppSetup.cabinDoorCodes.length; i++)
        {
            //door code display
            var code = document.createElement("P");
            code.setAttribute('id', "door-code-" + i);
            code.innerHTML = "DOOR " + webAppSetup.cabinDoorCodes[i] + ":";
            document.querySelector('#div-door-locks').appendChild(code);

            //door code button
            var button = document.createElement("BUTTON");
            button.setAttribute('id', "button-lock-" + i);
            button.innerHTML = webAppSetup.cabinDoorUnlocks[i] ? "LOCK DOOR" : "UNLOCK DOOR";
            button.addEventListener('click', buttonAssignment(button, i));
            document.querySelector('#div-door-locks').appendChild(button);
        }
        //need external function for proper door index to be passed through (otherwise it takes the last iteration of 'i')
        function buttonAssignment(door, doorIndex) {
            return function(){
                door.innerHTML = (door.innerHTML === "UNLOCK DOOR") ? "LOCK DOOR" : "UNLOCK DOOR";

                var webAppData = {
                    cabinDoorUpdate: true,
                    cabinDoorIndex: doorIndex,
                    musicUpdate: false,
                    musicStateChange: false,
                    musicTrackChange: false
                }
            
                puzzleTrainSettings.sendData(webAppData);
            }
        }

        //setup music toggles
        document.querySelector('#button-music-toggle').addEventListener('click', function()
        {
            document.querySelector('#button-music-toggle').innerHTML = (document.querySelector('#button-music-toggle').innerHTML === "PLAY") ? "STOP" : "PLAY";

            var webAppData = {
                cabinDoorUpdate: false,
                cabinDoorIndex: 0,
                musicUpdate: true,
                musicStateChange: true,
                musicTrackChange: false
            }
        
            puzzleTrainSettings.sendData(webAppData);
        });
        document.querySelector('#button-music-track').addEventListener('click', function()
        {
            document.querySelector('#button-music-toggle').innerHTML = "PLAY";

            var webAppData = {
                cabinDoorUpdate: false,
                cabinDoorIndex: 0,
                musicUpdate: true,
                musicStateChange: false,
                musicTrackChange: true
            }
        
            puzzleTrainSettings.sendData(webAppData);
        });
        
    },

    function(webAppResponse){

    }
);