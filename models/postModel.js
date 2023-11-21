const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
		},
		username: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: Array,
		},
		likes: {
			type: Array,
			default: [],
		},
		comments: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Post', PostSchema);
