var puzzleVendor = new Puzzle("PUZZLE_VENDOR", "Vendor", "./html/puzzle-vendor.html", 

    function (webAppSetup) {

        //vendor ads button setup
        var channelNames = webAppSetup.channelNames;
        for (let index = 0; index < channelNames.length; index++)
        {
            var button = document.createElement("BUTTON");
            button.setAttribute('id', "vendor-ads-button-" + index);
            button.innerHTML = channelNames[index];
            button.addEventListener("click", function () {
                var webAppData = {
                    newChannel: index,
                    moveVendor: null,
                    updateSnackIndex: null,
                    newSnackPrice: null
                }
                puzzleVendor.sendData(webAppData);
            });
            document.querySelector('#vendor-ads-buttons').appendChild(button);
        }

        //vendor positions button setup
        document.querySelector('#vendor-position-button-start').addEventListener("click", function () {
            var webAppData = {
                newChannel: null,
                moveVendor: false,
                updateSnackIndex: null,
                newSnackPrice: null
            }
            puzzleVendor.sendData(webAppData);
        });
        document.querySelector('#vendor-position-button-stop').addEventListener("click", function () {
            var webAppData = {
                newChannel: null,
                moveVendor: true,
                updateSnackIndex: null,
                newSnackPrice: null
            }
            puzzleVendor.sendData(webAppData);
        });

        //vendor prices button setup
        var snackPrices = webAppSetup.snackPrices;
        var priceChangeValue = 0.5;
        for (let index = 0; index < snackPrices.length; index++)
        {
            let minusButton = document.createElement("BUTTON");
            minusButton.innerHTML = "-";
            let snackPrice = document.createElement("P");
            snackPrice.innerHTML = snackPrices[index].toFixed(2);
            let plusButton = document.createElement("BUTTON");
            plusButton.innerHTML = "+";

            minusButton.addEventListener("click", function () {
                if (parseFloat(snackPrice.nodeValue) - priceChangeValue > 0)
                {
                    snackPrice.innerHTML = (parseFloat(snackPrice.nodeValue) - priceChangeValue).toFixed(2);
                    var webAppData = {
                        newChannel: null,
                        moveVendor: null,
                        updateSnackIndex: index,
                        newSnackPrice: parseFloat(snackPrice.nodeValue)
                    }
                    puzzleVendor.sendData(webAppData);
                }
            });
            plusButton.addEventListener("click", function () {
                if (parseFloat(snackPrice.nodeValue) + priceChangeValue < 5)
                {
                    snackPrice.innerHTML = (parseFloat(snackPrice.nodeValue) + priceChangeValue).toFixed(2);
                    var webAppData = {
                        newChannel: null,
                        moveVendor: null,
                        updateSnackIndex: index,
                        newSnackPrice: parseFloat(snackPrice.nodeValue)
                    }
                    puzzleVendor.sendData(webAppData);
                }
            });

            var snackColumn = document.createElement("TD");
            snackColumn.appendChild(plusButton);
            snackColumn.appendChild(snackPrice);
            snackColumn.appendChild(minusButton);
            document.querySelector('#vendor-prices').appendChild(snackColumn);
        }

    },

    function(webAppResponse){
    }
);