var map;
var markersArray = [];

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

function mapDraw() {
	var options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};

	navigator.geolocation.getCurrentPosition(function(position) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            disableDefaultUI: true
            });

            var url = '/api/getNearbyLobbies?radius=4&lat='+position.coords.latitude+'&lon='+position.coords.longitude;
            axios.get(url).then(function(response) {
                updateMarkers(response);
            });

        }, function() {}, options);
}

function updateMarkers(response){
		if(!window.localStorage.getItem("nlobbies")) window.localStorage.setItem("nlobbies",JSON.stringify([]));
		var temp = JSON.parse(window.localStorage.getItem("nlobbies"));
    clearOverlays();
        for(const lobby of response.data.lobbies) {
            var marker = new google.maps.Marker({
                position: { lat: lobby.lat, lng: lobby.lon },
                map: map,
                title: lobby.description,
                icon:{
                    url: "images/" + lobby.sport + ".png",
                    scaledSize: new google.maps.Size(30,50)
                }
            });
            markersArray.push(marker);
            marker.addListener('click', function() {
                var dialog = document.getElementById('join-lobby');
                dialog.lat = lobby.lat;
                dialog.lon = lobby.lon;
                fillOtherLobby(lobby.lat, lobby.lon);
                dialog.showModal();
            });
			var b = true;
			for(const l of temp) {
				if(l.lat === lobby.lat && l.lon === lobby.lon) var b = false;
			}
			if(b){
				var str = "There's a new " + lobby.sport + " lobby nearby!";
 				notify_user("Nearby lobby",str, "images/" + lobby.sport + ".png");
			}
        }
		window.localStorage.setItem("nlobbies", JSON.stringify(response.data.lobbies));
}
