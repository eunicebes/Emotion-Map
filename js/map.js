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
    var longlat, emotion, msg;
    var info = new Array();
    for (var item in data){
        var position = data[item].location;
        if(position != 'NA'){
            // alert(position);
            codeAddress(position, function(result){
                longlat = result
                emotion = data[item].emotion1
                msg = data[item].message
                info = [longlat, emotion, msg]

                placeMarker(info);
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
    // test();
}
function test(){
    address = '十勝川鍋物';
    geocoder.geocode({'address': address}, function(results, status){
        if(status = 'OK'){
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            console.log(address);
            //callback(results[0].geometry.location);
        }else{
            console.log('Geocode was not successful for the following reason: ' + status);
            //callback(0);
        }
    });
}
function codeAddress(address, callback){
    geocoder.geocode({'address': address}, function(results, status){
        if(status = 'OK'){
            // map.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //     map: map,
            //     position: results[0].geometry.location
            // });
            console.log(address);
            callback(results[0].geometry.location);
        }else{
            console.log('Geocode was not successful for the following reason: ' + status);
            callback(0);
        }
    });
}
function placeMarker(info){
    var marker = null;
    var coordinate, image;
    coordinate = info[0]
    marker = new google.maps.Marker({
        position: coordinate,
        map: map
    });
}