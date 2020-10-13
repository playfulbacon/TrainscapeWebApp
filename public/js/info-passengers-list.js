var infoPassengersList = new Puzzle("INFO_PASSENGERLIST", "./html/info-passengers-list.html", 

    function (webAppSetup) {

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
            luggage.innerHTML = webAppSetup.luggageIDs[index];
            luggage.style = "color:white";
            entry.appendChild(luggage);
        }

    },

);