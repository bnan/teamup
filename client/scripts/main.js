// FaceBook Login
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    var btn =document.getElementById('button_login');
    if (response.status === 'connected') {
        console.log('conectado');
        // Logged into your app and Facebook.
        btn.style.display = 'none';
        testAPI();
        console.log("Loading Map");
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

    } else if (response.status === 'not_authorized') {
        console.log('Continuar');
        // The person is logged into Facebook, but not your app.
        btn.style.display = 'block';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log('Iniciar Sessão');
        btn.style.display = 'block';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    console.log('Checking Login State');
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}



// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
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
    FB.login(function(response){
        // Handle the response object, like in statusChangeCallback() in our demo code.
        statusChangeCallback(response);
        initMap();
    });
}

function fb_logout(){
    console.log("Disconnect")
    FB.logout(function(response) {
    });
}
