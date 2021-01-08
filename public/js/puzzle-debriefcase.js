var debriefcasePuzzle = new Puzzle("DEBRIEFCASE", "Briefcase", "./html/puzzle-debriefcase.html", 

    function (webAppSetup) {

        for(var i = 0; i < webAppSetup.puzzleInputs.length; i++){
            document.querySelector('#debriefcase-index-' + i).innerHTML = webAppSetup.modeCharacters[i];
            document.querySelector('#debriefcase-input-' + i).innerHTML = webAppSetup.puzzleInputs[i];
        }

        document.querySelector('#debriefcase-button').addEventListener('click', function(){
            var webAppData = {};
            debriefcasePuzzle.sendData(webAppData);
        });
    },

    function(webAppResponse){

    },

    function(webAppInput){
        for(var i = 0; i < webAppInput.playerInputs.length; i++){
            var displayText = webAppInput.playerInputs[i] ? "O" : "X";
            document.querySelector('#debriefcase-input-solved-' + i).innerHTML = displayText;
        }
    }
);