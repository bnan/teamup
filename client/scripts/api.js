function fillSelfLobby() {
	FB.getLoginStatus(function(response) {
		if(response.status === 'connected'){
			var req = '/api/getLobbyByUser?fid='.concat(response.authResponse.accessToken);
			axios.get(req).then(function (response) {
				req = '/api/getUsersByLobby?lid='.concat(response.data.lobby[0].id);
				axios.get(req).then(function (response) {
					var lobby = document.getElementById("lobbylist");
					for(const user of response.data.users){
						var li = document.createElement("li");
						li.setAttribute("class", "mdl-list__item mdl-list__item--threeline");
						var span = document.createElement("span");
						span.setAttribute("class", "mdl-list__item-primary-content");
						var img = document.createElement("img");
						img.setAttribute("src", "http://graph.facebook.com/" + user.fid + "/picture?type=normal");
						var name = document.createElement("span");
						FB.api(
							"/"+user.fid,
							function (response) {
						  		if (response && !response.error) {
									name.innerHtml = response.name;
						 		}
    					});	
						span.appendChild(img);
						span.appendChild(name);
						li.appendChild(span);
						lobby.appendChild(li);
					}
				});
			});
		}
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

    dialog.close();
}
