const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter an username'],
			min: 5,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Please enter an email'],
		},
		password: {
			type: String,
			required: [true, 'Please enter an password'],
			min: 8,
		},
		profilePicture: {
			type: String,
			default: 'default_avatar.png',
		},
		coverPicture: {
			type: String,
			default: '',
			default: 'default_cover.png',
		},
		followers: {
			type: Array,
			default: [],
		},
		followings: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
