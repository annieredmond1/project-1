// CLIENT-SIDE JAVASCRIPT

// On page load
$(document).ready(function(){
  console.log('Javascript is working!');

function checkAuth() {
  $.get('/api/current-user', function (data) {
    console.log("data is: " + data);
    if (data.user) {
      console.log("logged in");
    } else {
      console.log("not logged in");
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
    console.log("made a new user");
    window.location.href = "/" + data._id;
    checkAuth();
  });
});

//When user logs in
  // $('#log-in').on('submit', function(e) {
  //   e.preventDefault();
  //   console.log("login form submitted");
  //   var user = $('log-in').serialize();
  //   console.log("user is: " + user);
  //   $.ajax({
  //     url: 'api/users',
  //     type: "POST",
  //     data: user
  //   })
  //   .done(function(data) {
  //     console.log("user logged in");
  //     window.location.href = "/" + data._id;
  //   });
  // });

  
  //When new prayer request is submitted
  $('#new-request').on('submit', function(e) {
  	console.log('form submitted');
  	e.preventDefault();
    var userId = $('#new-request').attr('data-id');
  	var formData = $(this).serialize();
    var newRequest = $( '#new-request-input').val();
  	console.log("request is: " + newRequest);
    console.log("user is : " + userId);
  	$.ajax({
      url: '/api/' + userId + '/requests',
      type: "POST",
      data: formData
    })
    .done(function(data) {
      console.log("made a new post");
        var requestHtml = "<li>" + newRequest + "<br><br><input class='answered' type='button' value='Mark as answered'></input><br><br><input class='delete' type='button' value='Delete'></input></li>";
        
        $('.active').prepend(requestHtml);
      });

    });


  //When delete button is clicked remove post
  $('.requests').on('click', '.delete', function() {
  	console.log("delete button was clicked");
  	var deleteRequest = $(this).closest('li');
  	$(deleteRequest).remove();
  });

  //When mark as answered button is clicked remove post and append to answered list
  $('.requests').on('click', '.answered', function() {
  	console.log("answered button was clicked");
  	var answerRequest = $(this).closest('li');
  	var answerHtml = "<li>" + answerRequest.text() + "<br><br><input class='delete' type='button' value='Delete'></input></li>";
  	$('.completed').prepend(answerHtml);
  	$(answerRequest).remove();
  });

var owner;
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