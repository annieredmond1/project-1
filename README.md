Prayer App
==========

Description:
-----------

This is an alternative to emailing prayer requests.  When people send out emails to their church/friends/family listing their requests for prayer, there is a lack of two way communication.  An email gets sent out but often there is no response.  Did anyone pray for them?  Likewise when prayer request emails are recieved, there is usually no follow up.  One wonders what happened with the situation being prayed about.  Was the prayer answered.  With my app, users can email the link to their user page to their church and/or friends.  In their user page they can add prayer requests, mark prayer requests as answered, and delete prayer requests.  Anyone with the link to their user page, can mark when they prayed for a prayer request, which will keep a tally of the total times each prayer request has been prayed for.


Link to prayer app: [link](https://aqueous-journey-5377.herokuapp.com/).


Link to wireframe: [link](https://moqups.com/annieredmond1@gmail.com/zh1l51qJ).

Relationship Diagrams:
---------------------
User --> (one to many) --> Requests

User narratives:
---------------

 	* John the "user needing prayer" can log in and add new prayer requests.

	* Amy the "non-user wanting to pray" can use the link she received from John to view his page and mark off any requests she's prayed for.

	* Sarah the "non-user who wants to make an account" signs up and  invites her friends/family to view her page with her unique page link.

	* Mike the "user whose prayer has been answered" can login and mark his pr as answered and optionally write a sentence or two describing how it was answered.

Libraries used:
--------------
   * bcrypt
   * body-parser
   * bootstrap-confirm-delete
   * chai
   * connect-mongo
   * cookie-parser
   * ejs
   * express
   * express-session
   * mocha
   * mongoose
   * request
   * bootstrap
   * jquery
   * jquery validate
   * google fonts

Future development:
------------------

	* Add google api to show where on map prayer requests were prayed for.
	* Add a user settings page and a password reset function.
	* Add option for visitor to leave their email to receive email notifications of page activity.

