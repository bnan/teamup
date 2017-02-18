// Handling States
function logged_out(){
    var btn = document.getElementById('button_login');
    var map = document.getElementById('map');
    var fab = document.getElementById('show-dialog');
    var ofuscator = document.querySelector('.mdl-layout__obfuscator');
    var drawer = document.querySelector('.mdl-layout__drawer');

    ofuscator.classList.remove("is-visible");
    drawer.classList.remove("is-visible");

    btn.style.display = 'block';
    map.style.display = 'none';
    fab.style.display = 'none';
}

function draw_map(){
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

    var marker = new google.maps.Marker({
        position: position,
        map: map
    });

}

// FaceBook Login
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    var btn =document.getElementById('button_login');

    if (response.status === 'connected') {
        console.log('Connected');
        draw_map();
    } else if (response.status === 'not_authorized') {
        console.log('Must Log On App');
        logged_out();
    } else {
        console.log('Must Log On in Facebook');
        logged_out();
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
        //console.log('Successful login for: ' + response.email);
        //var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
        //document.getElementById('status').innerHTML =response.name;
    });
}

// ============ MAP =====================

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
var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});

function fb_login(){
    console.log("Init by the button")
        FB.login(function(response){
            statusChangeCallback(response);
            initMap();
        });
}

function fb_logout(){
    event.preventDefault()
        FB.logout(function(response) {
        });
    logged_out();
}


