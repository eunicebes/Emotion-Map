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
    var longitude, latitude, emotion, msg;
    var info = new Array();
    for (var item in data){
        if (data[item].place != undefined){
            //console.log(data[item].place);
            try{
                latitude = data[item].place.location.latitude;
                longitude = data[item].place.location.longitude;
                emotion = data[item].emotion1;
                msg = data[item].message;
                info = [latitude, longitude, emotion, msg];
                // console.log(info);
                placeMarker(info);   
            }
            catch(e){
                console.error(e);
            }
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
    address = '3dao shabu shabu';
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
// function codeAddress(address, callback){
//     geocoder.geocode({'address': address}, function(results, status){
//         if(status == 'OK' && status != 'ZERO_RESULTS'){
//             // map.setCenter(results[0].geometry.location);
//             // var marker = new google.maps.Marker({
//             //     map: map,
//             //     position: results[0].geometry.location
//             // });
//             // console.log(address);
//             callback(results[0].geometry.location);
//         }else{
//             console.log('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }
var infowindow;
function placeMarker(info){
    var marker = null;
    var emotion, image, contentString;
    var myLatlng = new google.maps.LatLng(info[0], info[1]);
    emotion = info[2];
    contentString = info[3];
    // console.log(emotion);
    var icons = {
        haha: {
            image: {
                url: './img/laughing.png',
                scaledSize: new google.maps.Size(32, 32), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
        },
        wow: {
            image: {
                url: './img/surprised.png',
                scaledSize: new google.maps.Size(32, 32), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
        },
        love: {
            image: {
                url: './img/heart.png',
                scaledSize: new google.maps.Size(32, 32), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
        },
        sad: {
            image: {
                url: './img/unhappy.png',
                scaledSize: new google.maps.Size(32, 32), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
        },
        angry: {
            image: {
                url: './img/angry.png',
                scaledSize: new google.maps.Size(32, 32), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
        }
    };

    

    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: icons[emotion].image
    });

	var infocontent = '<div class="iw-container">'+
        '<p style="margin-top:8px">' + contentString.replace("\n", "<br/>") + '</p>'+
        '<p style="margin-top:20px;text-align:right;" id="correct-btn"><a href=\'javascript:show_correct()\'">情緒怪怪的？</a></p>'+
        '<div id="correct-option" style="display:none;text-align:right;color: #ff6666;">'+
        '<p style="margin-top:20px">這應該是' +
        '<a href=\'javascript:tag(\"' + contentString + '\",\"laughing\")\'><img width="15px" height="15px" src="./img/laughing.png"/></a>'+
        '<a href=\'javascript:tag(\"' + contentString + '\",\"surprised\")\'><img width="15px" height="15px" src="./img/surprised.png"/></a>'+
        '<a href=\'javascript:tag(\"' + contentString + '\",\"heart\")\'><img width="15px" height="15px" src="./img/heart.png"/></a>'+
        '<a href=\'javascript:tag(\"' + contentString + '\",\"unhappy\")\'><img width="15px" height="15px" src="./img/unhappy.png"/></a>'+
        '<a href=\'javascript:tag(\"' + contentString + '\",\"angry\")\'><img width="15px" height="15px" src="./img/angry.png"/></a>才對！</p>'+
        '</div>'+
    '</div>';

    marker.addListener('click', function() {
        if(infowindow) infowindow.close();

        infowindow = new google.maps.InfoWindow({
            // content: contentString
            content: infocontent
        });
        
        infowindow.open(map, marker);
    });
}

function tag(text, emo){
  console.log("Emo correction");  
  $.ajax({
    type: "POST",
    url: "tag.php",
    data: JSON.stringify({"text":text, "emo": emo}),
    success: function(response){
      console.log("echo : " + response);
    },
    error: function(error){
      console.log(error);
    }
  });
  $("#correct-option").css("display", "none");
}

function show_correct(){
	$("#correct-option").css("display", "block");
	$("#correct-btn").css("display", "none");
}
