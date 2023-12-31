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
			default:
				'https://static.pracujebolubie.pl/files/uploads/2017/04/facebook-avatar.jpg',
		},
		coverPicture: {
			type: String,
			default: '',
			default:
				'https://wallpapers.com/images/featured/dark-mountain-gd3o1mx0wxezbewk.jpg',
		},
		followers: {
			type: Array,
			default: [],
		},
		followings: {
			type: Array,
			default: [],
		},
		account_status: {
			type: Boolean,
			default: false,
		},
		activation_code: {
			type: String,
		},
		activation_code_exp: {
			type: Date,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
