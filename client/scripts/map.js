var map;

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
            marker.addListener('click', function() {
                var dialog = document.getElementById('join-lobby');
                dialog.lat = lobby.lat;
                dialog.lon = lobby.lon;
                fillOtherLobby(lobby.lat, lobby.lon);
                dialog.showModal();
            });
        }
}
