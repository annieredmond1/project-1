var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL || 
                      "YOUR OWN LOCAL URL HERE" );

// After creating a new model, require and export it:
// module.exports.Tweet = require("./tweet.js");


