// CLIENT-SIDE JAVASCRIPT

// On page load
$(document).ready(function(){
  console.log('Javascript is working!');

  //When new prayer request is submitted
  $('#new-request').on('submit', function(e) {
  	console.log('form submitted');
  	e.preventDefault();
  	var formdata = $('#new-request-input').val();
  	console.log("request is: " + formdata);
  	var requestHtml = "<li>" + formdata + "<br><br><input class='answered' type='button' value='Mark as answered'></input><br><br><input class='delete' type='button' value='Delete'></input></li>";
  	$(this)[0].reset();
  	$('.active').prepend(requestHtml);
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

  $('#view-public').on('click', function() {
  	console.log('change to public view is clicked');
  	
  });


});