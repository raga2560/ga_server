var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var BookingSchema = new mongoose.Schema({

	startdate: {
		type: Date,
		required: true
	},
	enddate: {
		type: Date,
		required: true
	},
	room: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	owner: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['reader', 'creator', 'editor'],
		default: 'reader'
	}

}, {
	timestamps: true
});


module.exports = mongoose.model('Booking', BookingSchema);
