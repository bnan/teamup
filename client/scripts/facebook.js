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
		axios.put('/api/joinLobby', {
			"lid": null,
			"fid": response.authResponse.userID
		});
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
    //console.log(response);
    if (response.status === 'connected') {
        console.log('Connected');
        logged_in();
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
    });
}
 
