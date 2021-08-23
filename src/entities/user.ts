var mongoose = require('mongoose');
import * as bcrypt from 'bcrypt';

var schema = mongoose.Schema({
	password:		{ type: String, required: true },
	email: 			{ type: String, required: true },
	dateEntry:  	{ type: Date, default: Date.now },
	status:         { type: Number, default: 0 }
},
{
    toObject: { virtuals: true},
	toJSON  : { getters: true }
});

schema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	next();
});

module.exports = mongoose.model('User', schema, 'User');