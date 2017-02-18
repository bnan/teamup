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

function fillSelfLobby() {
	FB.getLoginStatus(function(response1) {
		getLobbyByUser(response1.authResponse.userID, function(response2) {
			getUsersByLobby(response2.data.lobby[0].id, function(response3) {
				var lobby = document.getElementById("lobbylist");

				for(const user of response3.data.users) {
					var li = document.createElement("li");
					li.setAttribute("class", "mdl-list__item mdl-list__item--threeline");

					var span = document.createElement("span");
					span.setAttribute("class", "mdl-list__item-primary-content");

					var img = document.createElement("img");
					img.setAttribute("src", "http://graph.facebook.com/" + user.fid + "/picture?type=square");

					var name = document.createElement("span");
					name.setAttribute("id", user.fid);
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
					li.appendChild(span);
					lobby.appendChild(li);
				}
			});
		});
	});
}

function fillMap(){
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
					title: loby.description
			}
		});
	}
}

function store() {
    var inputPlayers= document.getElementById("maxplay");
    if(inputPlayers.value==""){
        alert("Max players must be filled out");
        return false;
        }
    else{
        console.log(inputPlayers.value);
    }
    if (document.getElementById('basket').checked) {
       var sport="basket"; 
       console.log(sport);
}
    else if(document.getElementById('foot').checked){
        var sport="foot"; 
        console.log(sport);
    }
    else if(document.getElementById('volley').checked){
        var sport="volley"; 
        console.log(sport);
    }
    else if(document.getElementById('tennis').checked){
        var sport="tennis"; 
        console.log(sport);
    }
    else if(document.getElementById('other').checked){
        var sport="other"; 
        console.log(sport);
    }
    var notes= document.getElementById("notes");
    if(notes.value==""){
        alert("Description must be filled out");
        return false;
        }
    else{
    console.log(notes.value);
    }
    /*Reset fields before close*/
    inputPlayers.value="";
    notes.value="";

    dialog.close();
}
