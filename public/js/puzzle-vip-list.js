var puzzleVipList = new Puzzle("VIP_LIST", "VIP List", "./html/puzzle-vip-list.html", 

    // setup callback
    function (webAppSetup) {
        
        //vip list setup
        var vipNumbers = webAppSetup.vipNumbers;
        var vipNames = webAppSetup.vipNames;

        var table = document.getElementById("vip-list-table");

        for (let i = 0; i < vipNumbers.length; i++)
        {
            var row = table.insertRow(0);
            var cellPara = row.insertCell(0);
            var cellInput = row.insertCell(1);
            var cellButton = row.insertCell(2);
            var cellResponse = row.insertCell(3);

            cellPara.innerHTML = vipNumbers[i];

            var inputField = document.createElement("INPUT");
            inputField.setAttribute("id", "vip-name-" + i);
            inputField.setAttribute("style", "text-transform:uppercase");
            inputField.value = vipNames[i];
            cellInput.append(inputField);
            
            var editButton = document.createElement("BUTTON");
            editButton.innerHTML = "UPDATE";
            editButton.addEventListener("click", function () {
                var newName = document.querySelector('#vip-name-' + i).value.toUpperCase();
                var webAppData = {
                    nameIndex: i,
                    name: newName
                }
                puzzleVipList.sendData(webAppData);
            });
            cellButton.append(editButton);

            var editReceivedMessage = document.createElement("P");
            editReceivedMessage.setAttribute("id", "vip-name-updated-" + i);
            cellResponse.append(editReceivedMessage);
        }

    },

    // response callback
    function(webAppResponse){

        //when message received by unity, show name updated text in webapp
        var i = webAppResponse.nameIndex;
        document.querySelector('#vip-name-updated-' + i).innerHTML = "DONE UPDATE";

    },

    // input callback
    function(webAppInput){

    }
);



