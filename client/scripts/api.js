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
				var lobby = document.getElementById("selflobby");

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

function fillOtherLobby(lat, lon){
	var url = '/api/getLobby?lat=' + lat + '&lon=' + lon;
	axios.get(url).then(function(response) {
		getUsersByLobby(response.data.lobby[0].id, function(response2) {
				
			var lobby = document.getElementById("otherlobby");
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
