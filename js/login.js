window.fbAsyncInit = function() {
  FB.init({
    appId      : '390157798032692',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.

function fb_login(){
  // FB 第三方登入
  FB.login(function(response)
  {
      //statusChangeCallback(response);
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        location.reload();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
  }, {scope: 'public_profile,user_birthday,user_posts'});

}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log(response.authResponse.accessToken);
     token = response.authResponse.accessToken;
    FB.api('/me', {fields: 'name,gender,birthday,posts'}, function(response) {
      // get user data
      console.log(response);
      //console.log(response.posts.data.length);
      get_data(response, token);
    });
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
      console.log('Please log into this app.');
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
      console.log('Please log into Facebook.');
  }
}

function get_data(response, token){
  //content = JSON.stringify(response);
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "handler.php",
    data: JSON.stringify({
        id: response.id,
        content: response
    }),
    success: function(response){

    },
    error: function(error){
      console.log(error);
    }
  });
}