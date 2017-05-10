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
  // FB ?ĤT???J
  FB.login(function(response)
  {
      //statusChangeCallback(response);
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        window.location = 'https://idea.cs.nthu.edu.tw/~eunice/emotion_Map/map.html';
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
  }, {scope: 'public_profile, user_birthday, user_posts'});

}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  //console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log(response.authResponse.accessToken);
    token = response.authResponse.accessToken;
    FB.api('/me', {fields: 'id,name,gender,birthday,posts'}, function(response) {
      // console.log(response);
      console.log(response);
      // console.log(response.posts.paging.next);
      get_data(response);
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

// get first page data
function get_data(response){
  //content = JSON.stringify(response);
  $.ajax({
    type: "POST",
    // dataType: "json",
    url: "handler.php",
    data: JSON.stringify(response),
    success: function(response){
      response = JSON.parse(response);
    console.log(response.data[0]);
    },
    error: function(error){
      console.log(error);
    }
  });

  if(response.posts.paging.next != undefined){
    next_url = response.posts.paging.next;
    nextPage(next_url, response.id);
  }
}

var posts_ary = new Array();
// get remain posts
function nextPage(url, id){
  FB.api(url, {}, function(response){
    $.ajax({
      type: "POST",
      //dataType: "json",
      url: "handler.php",
      data: JSON.stringify({
        id: id,
        posts: response
      }),
      success: function(response){
        response = JSON.parse(response);
        //console.log(response.data[0]);
        posts_ary = posts_ary.concat(response.data)
      },
      error: function(error){
        console.log('Fail' + error);
      }
    });

    try{
      if(response.data.length != 0){
        next_url = response.paging.next;
        nextPage(next_url, id);
      }
      else{
        console.log('no more post');
        console.log(posts_ary);
        catchData(posts_ary);
      }
    }catch(err){
      console.log(err.message);
    }
  });
}