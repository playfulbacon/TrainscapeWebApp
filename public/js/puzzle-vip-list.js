var puzzleVipList = new Puzzle("VIP_LIST", "./html/puzzle-vip-list.html", 

    // setup callback
    function (webAppSetup) {
        //show security bot password protection first, then once correct, only show vib list from then on
        document.querySelector("#div-security-passcode").style.display = "block";
        document.querySelector("#div-vip-list").style.display = "none";

        //security bot password protected
        var securityBotPasscode = webAppSetup.securityBotPasscode;
        
        document.querySelector("#passcode-button").addEventListener("click", function()
        {
            if (document.querySelector("#passcode-input").value.toUpperCase() === securityBotPasscode)
            {
                document.querySelector("#passcode-result").innerHTML = "- CORRECT PASSWORD -";
                document.querySelector("#div-security-passcode").style.display = "none";
                document.querySelector("#div-vip-list").style.display = "block";
            }
            else
            {
                document.querySelector("#passcode-result").innerHTML = "- INCORRECT PASSWORD -";
            }
        });

        //vip list setup
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



