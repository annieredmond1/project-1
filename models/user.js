var mongoose = require('mongoose'),
	Request = require('./request'),
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	email: {type: String, require: true, unique: true},
    passwordDigest: { type: String, require: true}, 
    first_name: { type: String },
    last_name: { type: String },
    description: { type: String },
    requests: [Request.schema]
});



UserSchema.statics.createSecure = function(userKeys, callback) {
	var user = this;

	bcrypt.genSalt(function(err, salt) {
		bcrypt.hash(userKeys.password, salt, function(err, hash) {
			console.log(hash);

			user.create({
				email: userKeys.email,
				passwordDigest: hash,
				first_name: userKeys.first_name,
				last_name: userKeys.last_name,
				description: userKeys.description
			}, callback);
		});
	});
};

UserSchema.statics.authenticate = function(email, password, callback) {
	this.findOne({email: email}, function(err, user) {
		console.log(user);

		if(!user) {
			console.log("No user with email " + email, null);
		} else if(user.checkPassword(password)) {
			callback(null, user);
		}
	});
};

UserSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordDigest);
};


var User = mongoose.model('User', UserSchema);


module.exports = User;




