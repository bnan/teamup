function getUsersByLobby(lid, cb) {
	var url = '/api/getUsersByLobby?lid='+lid;
	axios.get(url).then(function(response) {
		cb(response);
	});
}

function getLobbyByUser(fid, cb) {
	var url = '/api/getLobbyByUser?fid='+fid;
	axios.get(url).then(function(response) {
		cb(response);
	});
}

function joinLobby() {
    var dialog = document.getElementById('join-lobby');
    FB.getLoginStatus(function(response1) {
        axios.put('/api/joinLobby', {
            lat: dialog.lat,
            lon: dialog.lon,
            fid: response1.authResponse.userID
        });
	});
}

function leaveLobby() {
	FB.getLoginStatus(function(response) {
		getLobbyByUser(response.authResponse.userID, function(response2){
			console.log(response);
			axios.put('/api/leaveLobby', {
				lat: response2.data.lobby[0].lat,
				lon: response2.data.lobby[0].lon,
				fid: response.authResponse.userID
			});
		});
        window.location.href="/";
	});
}

function postLobby(sport, description, lat, lon, maximum, current) {
    FB.getLoginStatus(function(response) {
        var url = '/api/postLobby';
        axios.post(url, {
            sport: sport,
            description: description,
            lat: lat,
            lon: lon,
            maximum: maximum,
            current: current,
            fid: response.authResponse.userID
        });
        window.location.href="/";
    });
}

function fillSelfLobby() {
	FB.getLoginStatus(function(response1) {
		getLobbyByUser(response1.authResponse.userID, function(response2) {
			getUsersByLobby(response2.data.lobby[0].id, function(response3) {
	            var lobby = document.getElementById("selflobby");
				while (lobby.firstChild) {
    				lobby.removeChild(lobby.firstChild);
				}
				for(const user of response3.data.users) {
					var li = document.createElement("li");
					li.setAttribute("class", "mdl-list__item mdl-list__item--threeline");

					var span = document.createElement("span");
					span.setAttribute("class", "mdl-list__item-primary-content");

					var img = document.createElement("img");
					img.setAttribute("src", "http://graph.facebook.com/" + user.fid + "/picture?type=square");
                    img.setAttribute("style","margin-right:3.5%;")

					var name = document.createElement("span");
					name.setAttribute("id", user.fid);

                    name.setAttribute("style", "width:80%;");

                    var messenger = document.createElement("a");
                    messenger.setAttribute("href","https://m.me/"+user.fid);

                    var messenger_img = document.createElement("img");
                    messenger_img.setAttribute("src","https://cdn0.iconfinder.com/data/icons/social-media-2092/100/social-33-128.png");

                    messenger_img.setAttribute("style","width:40px;height:40px;position:relative;");

                    FB.api(
						"/"+user.fid,
						function (response4) {
							if (response4 && !response4.error) {
								document.getElementById(user.fid).innerText = response4.name;
							}
						}
					);

                    span.appendChild(img);
					span.appendChild(name);
                    messenger.appendChild(messenger_img);
                    span.appendChild(messenger);
                    li.appendChild(span);
					lobby.appendChild(li);
				}
                var size = document.createElement("h3");
                size.innerText = response2.data.lobby[0].current + '/' + response2.data.lobby[0].maximum;
                var button_leave = document.createElement("button");
                button_leave.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised mdl-button--colored");
                button_leave.setAttribute("onClick", "leaveLobby()")
                button_leave.innerText = "Leave";
                lobby.appendChild(size);
                lobby.appendChild(button_leave);
			});
		});
	});

}

function fillOtherLobby(lat, lon){
	var url = '/api/getLobby?lat=' + lat + '&lon=' + lon;
	axios.get(url).then(function(response) {
		console.log(response);
		getUsersByLobby(response.data.lobby[0].id, function(response2) {

			var lobby = document.getElementById("otherlobby");
			while (lobby.firstChild) {
				lobby.removeChild(lobby.firstChild);
			}

            var size = document.createElement("h3");
            size.innerText = response.data.lobby[0].current + '/' + response.data.lobby[0].maximum;
            lobby.appendChild(size);

			for(const user of response2.data.users) {
				var li = document.createElement("li");
				li.setAttribute("class", "mdl-list__item mdl-list__item--threeline");

				var span = document.createElement("span");
				span.setAttribute("class", "mdl-list__item-primary-content");

				var img = document.createElement("img");
				img.setAttribute("src", "http://graph.facebook.com/" + user.fid + "/picture?type=square");
                img.setAttribute("style","margin-right:3.5%;");

				var name = document.createElement("span");
				name.setAttribute("id", user.fid);

				FB.api(
					"/"+user.fid,
					function (response3) {
						if (response3 && !response3.error) {
							document.getElementById(user.fid).innerText = response3.name;
						}
					}
				);
				span.appendChild(img);
				span.appendChild(name);
				li.appendChild(span);
				lobby.appendChild(li);
			}
		});
	});
}

function store() {
	var options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};

	navigator.geolocation.getCurrentPosition(function(position) {
        var sport = document.querySelector('input[name="sport"]:checked').value;
        var description = document.getElementById("description").value;
        var maximum = document.getElementById("maximum").value;

        console.log('sport', sport);
        console.log('description', description);
        console.log('maximum', maximum);
        console.log('lat', position.coords.latitude);
        console.log('lon', position.coords.longitude);
        postLobby(sport, description, position.coords.latitude, position.coords.longitude, maximum, 1);
	}, function() {}, options);
}
