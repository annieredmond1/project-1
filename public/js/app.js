// CLIENT-SIDE JAVASCRIPT

// On page load
$(document).ready(function(){
  console.log('Javascript is working!');

//variable to identify if user is logged in
var owner;
//check if a user is logged in
function checkAuth() {
  $.get('/api/current-user', function (data) {
    console.log("data is: " + data);
    if (data.user) {
      console.log("logged in");
      $('.not-logged-in').hide();
      $('.visitor').hide();
      owner = true;
    } else {
      console.log("not logged in");
      $('.logged-in').hide();
      $('.owner').hide();

      owner = false;
    }
  });
}

checkAuth();

//When sign up form submitted
$('#signUpForm').on('submit', function(e) {
  e.preventDefault();
  console.log("form submitted");
  var user = $(this).serialize();
  console.log(user);
  $.ajax({
      url: '/api/users',
      type: "POST",
      data: user
  })
  .done(function(data) {

    window.location.href = "/users/" + data._id;
    console.log("made a new user");

  });
});

//when log out button is clicked
$('#log-out').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: '/api/logout',
    type: "GET"
    
  })
  .done(function(data) {
    console.log(data.msg);
    window.location.href = "/";

  });

});

// When user logs in
  $('#log-in').on('submit', function(e) {
    e.preventDefault();
    console.log("login form submitted");
    var user = $(this).serialize();
    console.log("user is: " + user);
    $.ajax({
      url: 'api/login',
      type: "POST",
      data: user
    })
    .done(function(data) {
      console.log("user logged in");
      window.location.href = "/users/" + data._id;
    });
  });

  
  //When new prayer request is submitted
  $('#new-request').on('click', function(e) {
  	e.preventDefault();
    console.log('form submitted');
    var userId = $('#new-request-input').attr('data-id');
    console.log("userID is: " + userId);
  	var formData = $('#new-request-input').serialize();
    console.log("formData is: " + formData);
    var newRequest = $( '#new-request-input').val();
  	console.log("request is: " + newRequest);
  	$.ajax({
      url: '/api/users' + userId + '/requests',
      type: "POST",
      data: formData
    })
    .done(function(data) {
      console.log("made a new post");
        var requestHtml = "<li class='well'>" + newRequest + "<br><br><input class='answered' type='button' value='Mark as answered'></input><br><br><input class='delete' type='button' value='Delete'></input></li>";
        
        $('.active').prepend(requestHtml);
      });

    });


  //When delete button is clicked remove post
  $('.requests').on('click', '.delete', function() {
  	console.log("delete button was clicked");
  	var deleteRequest = $(this).closest('li');
  	$(deleteRequest).remove();
  });

  //When mark as answered button is clicked 
  $('.requests').on('click', '.answered', function(e) {
    e.preventDefault();
  	console.log("answered button was clicked");
  	var answerRequest = $(this).closest('li');
    var userId = $('#new-request-input').attr('data-id');
    console.log("userID is: " + userId);
    var requestId = answerRequest.attr('data-id');
    console.log("requestId is: " + requestId);
    $.ajax({
      url: '/api/users/' + userId + '/requests/' + requestId,
      type: "PUT"
    })
    .done(function(data) {
      console.log("request marked as completed");
      answerRequest.wrap('<strike>');
    });
  	
  });

  

  $('#view-public').on('click', function() {
  	console.log('change to public view is clicked');
    // if(publicView) {
    //   publicView = false;
    // } else {
    //   publicView = true;
    // }
  	
  });

  //When prayed for button is clicked - update count
  var requests;
  $('.requests').on('click', '.count', function() {
    console.log("count button clicked");
    console.log();


  });








});