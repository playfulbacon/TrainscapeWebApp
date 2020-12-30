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

        //vendor positions button setup
        document.querySelector('#vendor-position-button-left').addEventListener("mousedown", function () {
            updateMoveDir = -1;
            updateVendor();
        });
        document.querySelector('#vendor-position-button-left').addEventListener("mouseup", function () {
            updateMoveDir = 0;
            updateVendor();
        });
        document.querySelector('#vendor-position-button-right').addEventListener("mousedown", function () {
            updateMoveDir = 1;
            updateVendor();
        });
        document.querySelector('#vendor-position-button-right').addEventListener("mouseup", function () {
            updateMoveDir = 0;
            updateVendor();
        });

        //vendor prices button setup
        var snackPrices = webAppSetup.snackPrices;
        let updatedSnackPrices = snackPrices;
        var priceChangeValue = 0.25;
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

            var snackColumn = document.createElement("TD");
            snackColumn.appendChild(plusButton);
            snackColumn.appendChild(snackPrice);
            snackColumn.appendChild(minusButton);
            document.querySelector('#vendor-prices').appendChild(snackColumn);
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