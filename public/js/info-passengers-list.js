var infoPassengersList = new Puzzle("INFO_PASSENGERLIST", "./html/info-passengers-list.html", 

    function (webAppSetup) {

        //symbols ref
        var symbols = ["img/symbol_1.png","img/symbol_2.png","img/symbol_3.png","img/symbol_4.png","img/symbol_5.png","img/symbol_6.png"];

        //generate passenger list display by iterating through lists of names, seats, luggage
        for (var index = 0; index < webAppSetup.names.length; index++)
        {
            //table row
            var entry = document.createElement("TR");
            document.querySelector('#table-passengers').appendChild(entry);

            //name
            var name = document.createElement("TD");
            name.setAttribute('id', "name-" + index);
            name.innerHTML = webAppSetup.names[index];
            name.style = "color:white";
            entry.appendChild(name);
            
            //seat id
            var seat = document.createElement("TD");
            seat.setAttribute('id', "seat-" + index);
            seat.innerHTML = webAppSetup.seatIDs[index];
            seat.style = "color:white";
            entry.appendChild(seat);

            //luggage tag
            var luggage = document.createElement("TD");
            luggage.setAttribute('id', "luggage-" + index);
            for (var i = 0; i < webAppSetup.luggageSymbols[index].length; i++)
            {
                var symbol = document.createElement("IMG");
                symbol.width = "32";
                symbol.height = "32";
                symbol.src = symbols[webAppSetup.luggageSymbols[index].substring(i,i+1)];
                luggage.appendChild(symbol);
            }
            entry.appendChild(luggage);
        }

    },
);

infoPassengersList.persistent = true;