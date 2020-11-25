var puzzleTrainSettings = new Puzzle("PUZZLE_TRAINSETTINGS", "Train Settings", "./html/puzzle-train-settings.html", 

    function (webAppSetup) {

        //setup music toggles
        document.querySelector('#button-music-toggle').addEventListener('click', function()
        {
            document.querySelector('#button-music-toggle').innerHTML = (document.querySelector('#button-music-toggle').innerHTML === "PLAY") ? "STOP" : "PLAY";

            var webAppData = {
                musicUpdate: true,
                musicStateChange: true,
                musicTrackChange: false
            }
        
            puzzleTrainSettings.sendData(webAppData);
        });
        document.querySelector('#button-music-track').addEventListener('click', function()
        {
            document.querySelector('#button-music-toggle').innerHTML = "STOP";

            var webAppData = {
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

puzzleTrainSettings.persistent = true;