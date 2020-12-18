var puzzleVendorAds = new Puzzle("PUZZLE_VENDOR_ADS", "Vendor Ads", "./html/puzzle-vendor-ads.html", 

    function (webAppSetup) {

        var channelNames = webAppSetup.channelNames;

        for (let index = 0; index < channelNames.length; index++)
        {
            var button = document.createElement("BUTTON");
            button.setAttribute('id', "vendor-ads-button-" + index);
            button.innerHTML = channelNames[index];
            button.addEventListener("click", function () {
                var webAppData = {
                    newChannel: index
                }
                puzzleVendorAds.sendData(webAppData);
            });
            document.querySelector('#vendor-ads-buttons').appendChild(button);
        }
    },

    function(webAppResponse){
    }
);