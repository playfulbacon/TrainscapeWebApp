var puzzle = new Puzzle("STORAGE_BOX", function (webAppSetup) {
    setup(webAppSetup);
});

function setup(webAppSetup){
    var trainID = "Train Number: " + webAppSetup.trainID;
    document.querySelector('#train-ID').innerHTML = trainID;
    document.querySelector('#storage-box-button').addEventListener('click',function()
    {
        var webAppData = {
            code: document.querySelector('#storage-box-input').value.toLowerCase()
        }

        puzzle.sendData(webAppData);
    });
}

/*
fetch('/cssTest.html')
    .then((response) => {
        return response.text();
    })
    .then((body) => {
        document.querySelector('#game-content').innerHTML = body;
    });
*/
