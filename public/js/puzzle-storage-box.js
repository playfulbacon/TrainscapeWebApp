var storageBoxPuzzle = new Puzzle("STORAGE_BOX", function (webAppSetup) {
    storageBoxSetup(webAppSetup);
});

function storageBoxSetup(webAppSetup){
    var trainID = "Train Number: " + webAppSetup.trainID;
    document.querySelector('#train-ID').innerHTML = trainID;
    document.querySelector('#storage-box-button').addEventListener('click',function()
    {
        var webAppData = {
            code: document.querySelector('#storage-box-input').value.toLowerCase()
        }

        storageBoxPuzzle.sendData(webAppData);
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
