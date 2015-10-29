var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
salt = bcrypt.genSaltSync(10);

var Schema = mongoose.Schema;

var RequestSchema = new Schema ({
	completed: {type: Boolean, default: false},
	description: { type: String, required: true}, 
	prayerCount: { type: Number, default: 0},
	createdAt: { type: Date, default: Date.now },
	comment: { type: String, default: "" }

});

function toLower (v) {
	return v.toLowerCase();
}

var UserSchema = new Schema ({
	email: {type: String, required: true, select: false, unique: true, set: toLower },
	passwordDigest: { type: String, required: true, select: false }, 
	first_name: { type: String },
	last_name: { type: String },
	description: { type: String },
	requests: [RequestSchema]
});



UserSchema.statics.createSecure = function(userKeys, callback) {
	var user = this;

	bcrypt.genSalt(function(err, salt) {
		bcrypt.hash(userKeys.password, salt, function(err, hash) {
			console.log("hash is: ", hash);
			if(err) console.log("err is: ", err);
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
	this.findOne({email: email}).select('email passwordDigest').exec(function(err, user) {
			console.log("in authenticate: error and user are:", err, user);
			if (!user) {
				console.log("No user with email " + email, null);
				console.log("err: ", err);
				callback(err, null);
			} else if(user.checkPassword(password)) {
				console.log("password correct");
				callback(null, user);
			} else if (!user.checkPassword(password)) {
				console.log("wrong password");
				callback(null, null);
			}
	});
};

UserSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordDigest);
};


var User = mongoose.model('User', UserSchema);



module.exports = User;




