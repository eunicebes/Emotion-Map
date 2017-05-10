var geocoder;
var map;
function myMap() {
    var inilat = 25.037;
    var inilng = 121.56693799999994;
    var option = {
        enableHighAccuracy: true,
        maximumAge: 600000,
        timeout: 5000
    }
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showPosition, showError, option);
        initMap(inilat, inilng);
    } else {
        //alert("Geolocation is not supported by this browser.");
        initMap(inilat, inilng);
    }
}

function showError(error) {
    var inilat = 25.037;
    var inilng = 121.56693799999994;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            //alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            //alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            //alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            //alert("An unknown error occurred.");
            break;
    }
    //showmap(inilat, inilng);
}
function catchData(data){
    var longtitude;
    var latitude;
    for (var item in data){
        var loca = data[item].location;
        if(loca != 'NA'){
            alert(loca);
            codeAddress(loca, function(result){
                longtitude = result.lng();
                latitude = result.lat();
            });
        }   
    }
}
function initMap(inilat, inilng) {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(inilat, inilng),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();
}
function codeAddress(address, callback){
    geocoder.geocode({'address': address}, function(results, status){
        if(status = 'OK'){
            // map.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //     map: map,
            //     position: results[0].geometry.location
            // });
            
            callback(results[0].geometry.location);
        }else{
            console.log('Geocode was not successful for the following reason: ' + status);
            callback(0);
        }
    });
}
function placeMarker(){
    var marker = null;
    var coordinate;
    marker = new google.maps.Marker({
        position: coordinate,
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
        content: infocontent,
        maxWidth: 300
    });
}