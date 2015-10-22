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
  	var requestHtml = "<li>" + formdata + "<br><br><button class='answered'>Mark as answered</button><br><br><button class='delete'>Delete</button></li>";
  	$(this)[0].reset();
  	$('.active').prepend(requestHtml);
  });

  //When delete button is clicked
  $('.requests').on('click', '.delete', function() {
  	console.log("delete button was clicked");
  	var deleteRequest = $(this).closest('li');
  	$(deleteRequest).remove();

  });


});