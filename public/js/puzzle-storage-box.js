var storageBoxPuzzle = new Puzzle("STORAGE_BOX", "./html/puzzle-storage-box.html", function (webAppSetup) {
    var trainID = "Train Number: " + webAppSetup.trainID;
    document.querySelector('#train-ID').innerHTML = trainID;
    document.querySelector('#storage-box-button').addEventListener('click',function()
    {
        var webAppData = {
            code: document.querySelector('#storage-box-input').value.toLowerCase()
        }

        document.querySelector('#storage-box-input').value = "";

        storageBoxPuzzle.sendData(webAppData);
    });
});