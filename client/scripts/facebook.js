function fb_init() {
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

function fb_login(){
    console.log("Init by the button");
    FB.login(function(response){
        statusChangeCallback(response);
    });
}

function fb_logout(){
    event.preventDefault()
    FB.logout(function(response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    var btn = document.getElementById('button_login');
    var mapElement = document.getElementById('map');
    var info = document.getElementById('info');
    var info_lobby = document.getElementById('info_lobby');
    var info_account = document.getElementById('info_account');
    var fab = document.getElementById('create-lobby-btn');
    var account = document.getElementById('personal_account')
    if (response.status === 'connected') {
        console.log('Connected');
        mapDraw();
        mapElement.style.display = 'block';
        btn.style.display = "none";
        info.style.display = "none";
        info_lobby.style.display = "none";
        info_account.style.display = "none";
        fab.style.display = "block";
        account.style.display = "block"
    FB.api('/me', function(response) {
        var im = document.getElementById("profile_pic").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
    });

    } else if (response.status === 'not_authorized') {
        console.log('Must Log On App');
        mapElement.style.display = 'none';
        btn.style.display = "block";
        info.style.display = "block";
        info_lobby.style.display = "block";
        info_account.style.display = "block";
        fab.style.display = "none";
        account.style.display = "none";
    } else {
        console.log('Must Log On in Facebook');
        mapElement.style.display = 'none';
        btn.style.display = "block";
        info.style.display = "block";
        info_lobby.style.display = "block";
        info_account.style.display = "block";
        fab.style.display = "none";
        account.style.display = "none";
    }
}

function checkLoginState() {
    console.log('Checking Login State');
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        console.log('Successful login for: ' + response.id);
    });
}
