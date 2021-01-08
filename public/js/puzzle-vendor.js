var puzzleVendor = new Puzzle("PUZZLE_VENDOR", "Vendor", "./html/puzzle-vendor.html", 

    function (webAppSetup) {

        //stored variables since need to send all variables back
        var updateChannel = -1;
        var updateMoveDir = 0;
        var updateSnackIndex = -1;
        var updateSnackPrice = -1;

        //vendor ads button setup
        var channelNames = webAppSetup.channelNames;
        for (let index = 0; index < channelNames.length; index++)
        {
            var button = document.createElement("BUTTON");
            button.setAttribute('id', "vendor-ads-button-" + index);
            button.innerHTML = channelNames[index];
            button.addEventListener("click", function () {
                updateChannel = index;
                updateVendor();
            });
            document.querySelector('#vendor-ads-buttons').appendChild(button);
        }

        var buttonVendorMoveLeft = document.querySelector('#vendor-position-button-left');
        var buttonVendorMoveRight = document.querySelector('#vendor-position-button-right');

        //vendor positions button setup
        buttonVendorMoveLeft.addEventListener("mousedown", function () { moveVendor(-1)});
        buttonVendorMoveLeft.addEventListener("mouseup", function () { moveVendor(0)});
        buttonVendorMoveRight.addEventListener("mousedown", function () { moveVendor(1)});
        buttonVendorMoveRight.addEventListener("mouseup", function () { moveVendor(0)});
        buttonVendorMoveLeft.addEventListener("touchstart", function () { moveVendor(-1)});
        buttonVendorMoveLeft.addEventListener("touchend", function () { moveVendor(0)});
        buttonVendorMoveRight.addEventListener("touchstart", function () { moveVendor(1)});
        buttonVendorMoveRight.addEventListener("touchend", function () { moveVendor(0)});

        //vendor prices button setup
        var snackPrices = webAppSetup.snackPrices;
        let updatedSnackPrices = snackPrices;
        var priceChangeValue = 0.25;

        var table = document.getElementById("vendor-prices");

        for (let index = 0; index < snackPrices.length; index++)
        {
            var minusButton = document.createElement("BUTTON");
            minusButton.innerHTML = "-";
            var snackPrice = document.createElement("P");
            snackPrice.setAttribute("id", "vendor-snack-" + index);
            snackPrice.innerHTML = "$" + snackPrices[index].toFixed(2);
            var plusButton = document.createElement("BUTTON");
            plusButton.innerHTML = "+";

            minusButton.addEventListener("click", function () {
                if ((updatedSnackPrices[index] - priceChangeValue) > 0)
                {
                    updateSnackIndex = index;
                    updateSnackPrice = updatedSnackPrices[index] - priceChangeValue;
                    updatedSnackPrices[index] = updateSnackPrice;
                    document.querySelector('#vendor-snack-' + index).innerHTML = "$" + (updatedSnackPrices[index]).toFixed(2);
                    updateVendor();
                }
                else
                {
                    updateSnackIndex = -1;
                    updateSnackPrice = -1;
                }
            });
            plusButton.addEventListener("click", function () {
                if ((updatedSnackPrices[index] + priceChangeValue) <= 3)
                {
                    updateSnackIndex = index;
                    updateSnackPrice = updatedSnackPrices[index] + priceChangeValue;
                    updatedSnackPrices[index] = updateSnackPrice;
                    document.querySelector('#vendor-snack-' + index).innerHTML = "$" + (updatedSnackPrices[index]).toFixed(2);
                    updateVendor();
                }
                else
                {
                    updateSnackIndex = -1;
                    updateSnackPrice = -1;
                }
            });

            var labelRow = table.insertRow(index * 2);
            labelRow.insertCell(0);
            var cellLabel = labelRow.insertCell(1);
            labelRow.insertCell(2);
            cellLabel.innerHTML = webAppSetup.snackNames[index];

            var row = table.insertRow(index*2 + 1);
            var cellMinus = row.insertCell(0);
            var cellPrice = row.insertCell(1);
            var cellPlus = row.insertCell(2);

            cellPlus.append(plusButton);
            cellPrice.append(snackPrice);
            cellMinus.append(minusButton);
        }

        function moveVendor(direction){
            updateMoveDir = direction;
            updateVendor();
        }

        //sends all variables back to unity whenever any interaction on page sent
        function updateVendor() {
            var webAppData = {
                newChannel: updateChannel,
                moveVendorDir: updateMoveDir,
                updateSnackIndex: updateSnackIndex,
                newSnackPrice: updateSnackPrice
            }
            puzzleVendor.sendData(webAppData);
        }

    },

    function(webAppResponse){
    }
);