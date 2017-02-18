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
