var puzzleVipList = new Puzzle("VIP_LIST", "./html/puzzle-vip-list.html", 

    // setup callback
    function (webAppSetup) {
        var defaultNames = webAppSetup.defaultNames;

        var table = document.getElementById("vip-list-table");

        defaultNames.forEach((name) => {
            var row = table.insertRow(0);
            var cell = row.insertCell(0);
            cell.innerHTML = name;
        });

        document.getElementById("vip-list-button").addEventListener("click", () => {   
            var nameInput = document.getElementById('vip-list-input');
            var name =  nameInput.value.toUpperCase();
            nameInput.value = "";

            var table = document.getElementById("vip-list-table");
            var row = table.insertRow(0);
            var cell = row.insertCell(0);
            cell.innerHTML = name;

            var webAppData = {
                name: name
            }
            
            puzzleVipList.sendData(webAppData);
        });
    },

    // response callback
    function(webAppResponse){

    },

    // input callback
    function(webAppInput){

    }
);



