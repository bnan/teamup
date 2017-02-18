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
	var url = '/api/getLobby?lat=' + dialog.lat + '&lon=' + dialog.lon;
	axios.get(url).then(function(response) {
		FB.getLoginStatus(function(response1) {
			axios.put('/api/joinLobby', {
				"lat": dialog.lat,
				"lon": dialog.lon,
				"lid": response.data.lobby[0].id,
				"fid": response1.authResponse.userID
			});
		});
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

					var name = document.createElement("span");
					name.setAttribute("id", user.fid);
                    
                    var messenger = document.createElement("a");
                    messenger.setAttribute("href","https://m.me/"+user.fid);
                var messenger_img = document.createElement("img");
                  messenger_img.setAttribute("src","https://cdn0.iconfinder.com/data/icons/social-media-2092/100/social-33-128.png");
                    
                    messenger_img.setAttribute("style","width:35%;position:relative;")
                 

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
			for(const user of response2.data.users) {
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
    
}
