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
        document.getElementById("tab-map").click();
	});
    fillSelfLobby();
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
    });
}

function fillSelfLobby() {
    var ul = document.getElementById("selflobby");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
	FB.getLoginStatus(function(response1) {
		getLobbyByUser(response1.authResponse.userID, function(response2) {
			getUsersByLobby(response2.data.lobby[0].id, function(response3) {
				for(const user of response3.data.users) {
					var li = document.createElement("li");
					li.setAttribute("class", "mdl-list__item");

					var primary = document.createElement("span");
					primary.setAttribute("class", "mdl-list__item-primary-content");

                        var primaryAvatar = document.createElement("img");
                        primaryAvatar.setAttribute("src", "http://graph.facebook.com/" + user.fid + "/picture?type=square");
                        primaryAvatar.classList.add('mdl-list__item-avatar');

                        var primaryName = document.createElement("span");
                        primaryName.setAttribute("id", user.fid);

                    var secondary = document.createElement('span');
                    secondary.classList.add('mdl-list__item-secondary-content');

                        var secondaryMessage = document.createElement("a");
                        secondaryMessage.setAttribute("href","https://m.me/"+user.fid);
                        secondaryMessage.classList.add('mdl-list__item-secondary-action');

                            var secondaryMessageIcon = document.createElement('i');
                            secondaryMessageIcon.classList.add('material-icons');
                            secondaryMessageIcon.textContent = 'message';
                            secondaryMessage.appendChild(secondaryMessageIcon);

                    FB.api(
						"/"+user.fid,
						function (response4) {
							if (response4 && !response4.error) {
								document.getElementById(user.fid).innerText = response4.name;
							}
						}
					);

                    primary.appendChild(primaryAvatar);
                    primary.appendChild(primaryName);
                    secondary.appendChild(secondaryMessage);
                    li.appendChild(primary);
                    li.appendChild(secondary);
					ul.appendChild(li);
				}

                var div = document.createElement('div');
                div.classList.add('center');
                /*
                var size = document.createElement("h3");
                size.innerText = response2.data.lobby[0].current + '/' + response2.data.lobby[0].maximum;
                */
                var button_leave = document.createElement("button");
                button_leave.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised mdl-button--colored");
                button_leave.setAttribute("onClick", "leaveLobby()")
                button_leave.innerText = "Leave Lobby";
                div.appendChild(button_leave);
                ul.appendChild(div);
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
				name.setAttribute("id", "other-"+user.fid);

				FB.api(
					"/"+user.fid,
					function (response3) {
						if (response3 && !response3.error) {
							document.getElementById("other-"+user.fid).innerText = response3.name;
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
