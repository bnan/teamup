function logged_out() {
    var btn = document.getElementById('button_login');
    var mapElement = document.getElementById('map');
    var info = document.getElementById('info');
    var info_lobby = document.getElementById('info_lobby');
    var info_account = document.getElementById('info_account');
    var fab = document.getElementById('create-lobby-btn');
    var self_lobby = document.getElementById('selflobby');

    mapElement.style.display = 'none';
    btn.style.display = "block";
    info.style.display = "block";
    info_lobby.style.display = "block";
    self_lobby.style.display = "none";
    fab.style.display = "none";
}

function logged_in(){
    var btn = document.getElementById('button_login');
    var mapElement = document.getElementById('map');
    var info = document.getElementById('info');
    var info_lobby = document.getElementById('info_lobby');
    var info_account = document.getElementById('info_account');
    var fab = document.getElementById('create-lobby-btn');
    var self_lobby = document.getElementById('selflobby');
    mapDraw();
    mapElement.style.display = 'block';
    btn.style.display = "none";
    info.style.display = "none";
    info_lobby.style.display = "none";
    fab.style.display = "block";
    self_lobby.style.display = "block";
}
