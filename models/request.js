var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var RequestSchema = new Schema ({
	completed: {type: Boolean, required: true},
    description: { type: String, required: true}, 
    prayerCount: { type: Number, default: 0},
    createdAt: { type: Date, default: Date.now }
    
});


var Request = mongoose.model('Request', RequestSchema);


module.exports = Request;