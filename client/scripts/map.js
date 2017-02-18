function mapDraw(){
    var btn = document.getElementById('button_login');
    var map = document.getElementById('map');
    var fab = document.getElementById('show-dialog');
    btn.style.display = 'none';
    map.style.display = 'block';
    fab.style.display = 'block';

    var position = {lat: -25.363, lng: 131.044};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: position,
        disableDefaultUI: true
    });

	var options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};

	navigator.geolocation.getCurrentPosition(function(position){
		var url = '/api/getNearbyLobbies?radius=2&lat='+position.coords.latitude+'&lon='+position.coords.longitude;
		axios.get(url).then(function(response){
			for(const lobby of response.data.lobbies){
				var marker = new google.maps.Marker({
					position: {lat: lobby.lat, lng: lobby.lon},
					map: map,
					title: lobby.description
				});

    			marker.addListener('click', function() {
        			var dialog = document.createElement('dialog');
        			dialog.showModal();
    			});
			}
		});
	});
    
}

function initMap() {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '741282629382475',
            cookie     : true,  // enable cookies to allow the server to access 
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.8
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

    };
   
}



