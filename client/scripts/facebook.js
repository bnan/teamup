function facebookLogin(callback) {
    console.log('Login');
    FB.login(function(response) {
        statusChangeCallback(response);
        callback(); // initMap
    });
}

function facebookLogout(callback) {
    console.log('Logout');
    FB.logout(function(response) {
        callback();
    });
}
