function initMap() {
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