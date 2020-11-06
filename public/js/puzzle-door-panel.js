var doorPanelPuzzle = new Puzzle("DOOR_PANEL", false, "./html/puzzle-door-panel.html", 

    function (webAppSetup) {
        for(let i = 0; i < webAppSetup.buttonRows * webAppSetup.buttonCols; i++){
            document.querySelector('#panel-button-' + i).addEventListener('click',function()
            {
                var webAppData = {
                    buttonIndex: i
                }

                doorPanelPuzzle.sendData(webAppData);
            });
            
            document.querySelector('#panel-button-' + i).innerHTML = webAppSetup.puzzleInputs[i].symbolIndex;
        }

        var answerSequence = webAppSetup.answerSequence;

        for(var i = 0; i < answerSequence.length; i++){
            document.querySelector('#answer-' + i).innerHTML = answerSequence[i].symbolIndex;
            document.querySelector('#answer-' + i).style.color = "#" + webAppSetup.colors[answerSequence[i].colorIndex];
        }
    },

    function(){}
);