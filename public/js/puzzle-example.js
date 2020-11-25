var puzzleExample = new Puzzle("PUZZLE_EXAMPLE", "Example", "./html/puzzle-example.html", 

    function (webAppSetup) {
        //puzzleExample.sendData(webAppData);
        document.querySelector('#example-correct-color').innerHTML = webAppSetup.correctColor;

        document.querySelector('#example-button-right').addEventListener('click', () =>
        {
            var webAppData = {
                isMovingRight: true
            }
    
            puzzleExample.sendData(webAppData);
        });

        document.querySelector('#example-button-left').addEventListener('click', () =>
        {
            var webAppData = {
                isMovingRight: false
            }
    
            puzzleExample.sendData(webAppData);
        });
    },

    function(webAppResponse){
        var message = "NO!";
        if (webAppResponse.isCorrect)
            message = "YES!"

        document.querySelector('#example-response').innerHTML = message;
    }
);