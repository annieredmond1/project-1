// CLIENT-SIDE JAVASCRIPT

//TODO

// On page load
$(document).ready(function(){
  console.log('Javascript is working!');

//validations
  $('#signUpForm').validate({
    rules: {
      email: {
            required: true,
            email: true
          },
      password: {
            required: true,
            minlength: 4
          },
      password2: {
            required: true,
            minlength: 4,
            equalTo: '#password'
      }
    }
  });
  // $('#log-in').validate({
  //   rules: {
  //     email: {
  //         required: true,
  //         email: true
  //       },
  //     password: {
  //         required: true
  //       }
  //   }
  // });

//variable to identify if user is logged in
var owner;
//check if a user is logged in
function checkAuth() {
  $.get('/api/current-user', function (data) {
    console.log("data is: " + data);
    if (data.user || data.userId) {
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

//error handler function
function errorHandler(msg, type) {
  //data.message //=> message: "Post validation failed"
  $('#alert').addClass('alert-danger').text(msg).fadeIn();
  setTimeout(function() { $('#alert').fadeOut(); }, 4000);
  $('#alert-sign-up').addClass('alert-danger').text(msg).fadeIn();
  setTimeout(function() { $('#alert-sign-up').fadeOut(); }, 4000);
  
}

//When sign up form submitted
$('#signUpForm').on('submit', function(e) {
  e.preventDefault();
  if ($('#signUpForm').valid()) {
    console.log("form submitted");
    var user = $(this).serialize();
    console.log(user);
    $.ajax({
        url: '/api/users',
        type: "POST",
        data: user
    })
    .done(function(data) {
      if (data.status == 404) {
        console.log("err message should activate");
        var msg = "Email already in use";
        errorHandler(msg, 'alert-danger');
      } else {
      window.location.href = "/users/" + data._id;
      console.log("made a new user");
    }
    })
    .fail(function(err) {
      console.log("could not create user");
      var msg = "Email already in use";
        errorHandler(msg, 'alert-danger');
    });
 }
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
    window.location.reload();

  });

});




// When user logs in
  $('#log-in').on('submit', function(e) {
    e.preventDefault();
    console.log("login form submitted");
    var user = $(this).serialize();
    console.log("user is: " + user);
    $.ajax({
      url: '/api/login',
      type: "POST",
      data: user
    })
    .done(function(data) {
      if (data.status == 404) {
        var msg = "Email or password not correct";
        errorHandler(msg, 'alert-danger');
      } else {
      console.log("user logged in");
        window.location.href = "/users/" + data._id;
      }
    })
    .fail(function() {
      var msg = "Email or password not correct";
      errorHandler(msg, 'alert-danger');
    });
     
  });

  
  //When new prayer request is submitted
  $('#new-request').on('submit', function(e) {
  	e.preventDefault();
    console.log('form submitted');
    var userId = $('#new-request-input').attr('data-id');
    console.log("userID is: " + userId);
  	var formData = $('#new-request-input').serialize();
    console.log("formData is: " + formData);
    var newRequest = $( '#new-request-input').val();
  	console.log("request is: " + newRequest);
    $('#new-request')[0].reset();
  	$.ajax({
      url: '/api/users/' + userId + '/requests',
      type: "POST",
      data: formData
    })
    .done(function(request) {
      console.log("made a new post");
        var requestHtml = "<li class='well' data-id='" + request._id + "'>" + newRequest + "<p><strong>Prayer count: <span class='pray-count'>" + request.prayerCount + " </span></strong></p><button type='button' data-id='" + request._id + "' class='btn btn-default btn-lg openModal owner' data-toggle='modal' data-target='#answeredModal'>Answered</button><button type='button' data-id='" + request._id + "' class='close owner deleteModal' data-target='#deletedModal' data-toggle='modal' data-placement='top' title='Delete prayer request' aria-label='Close'><span aria-hidden='true'>X</span></button><label><button type='button' class='btn btn-default btn-xs count visitor'>I prayed for this request</button><label></li>";
        $('.active').prepend(requestHtml);
        checkAuth();
      });

    });


//give form in modal a data-id based on the request
  $('.openModal').on('click', function() {
    var id = $(this).attr('data-id');
    console.log("id is: " + id);
    $('.answeredForm').attr('data-id', id);
    
  });

  //give form in modal a data-id based on the request
  $('.deleteModal').on('click', function() {
    console.log("delete button is clicked");
    var id = $(this).attr('data-id');
    console.log("id is: " + id);
    $('.deleteForm').attr('data-id', id);
  });

  // //When delete button is clicked remove post
  $('.deleteForm').on('submit', function(e) {
    e.preventDefault();
    var requestId = $(this).data('id');
    var deleteRequest = $('li[data-id="' + requestId + '"]');
  	console.log("delete button was clicked");
    var userId = $('#new-request-input').attr('data-id');
    console.log("userId is: " + userId);
    console.log("requestId is: " + requestId);
    $.ajax({
      url: '/api/users/' + userId + '/requests/' + requestId,
      type: "DELETE"
    })
    .done(function (data) {
      $('#delete-modal').trigger('click');
      console.log("delete request is: ", deleteRequest);
      $(deleteRequest).remove();
      
    });
  });

  //When mark as answered button is clicked 
  $('.answeredForm').on('submit', function(e) {
    e.preventDefault();
    var requestId = $(this).attr('data-id');
    console.log("answered form submitted");
  	var answerRequest = $('li[data-id="' + requestId + '"]');
    console.log("answer request is: ", answerRequest);
    var userId = $('#new-request-input').attr('data-id');
    var formData = $('#inputAnswered').serialize();
    console.log("comment is: " + formData);
    console.log("requestId is: " + requestId);
    $.ajax({
      url: '/api/users/' + userId + '/requests/' + requestId,
      type: "PUT",
      data: formData
    })
    .done(function(data) {
      console.log("request marked as completed");
      $('#close-modal').trigger('click');
      answerRequest.find('button.openModal').remove();
      answerRequest.css("opacity", "0.5");
    });
  });   

  //When prayed for button is clicked
  $('.requests').on('click', '.count', function() {
    console.log("count button clicked");
    var prayerRequest = $(this).closest('li');
    var userId = $('#new-request-input').attr('data-id');
    console.log("user id is: " + userId);
    var requestId = prayerRequest.attr('data-id');
    console.log("requestId is: " + requestId);
    $.ajax({
      url: '/api/users/' + userId + '/requests/count/' + requestId,
      type: "PUT"
    })
    .done(function(data) {
      //update the prayer count number before page refreshes
      console.log("request prayed for");
      var num = prayerRequest.find('span.pray-count').text();
      console.log('num value is: ', num);
      var numInt = parseInt(num, 10);
      numInt++;
      numString = numInt.toString();
      num = prayerRequest.find('span.pray-count').text(numString);

    });
  });








});