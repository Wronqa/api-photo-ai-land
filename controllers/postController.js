const express = require('express');

const asyncErrorMiddleware = require('../middleware/asyncErrorMiddleware');
const ErrorHandler = require('../tools/errorHandler');

const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.addPost = asyncErrorMiddleware(async (req, res) => {
	const username = req.username;

	const post = new Post({
		title: req.body.title,
		desc: req.body.desc,
		img: req.body.img ? req.body.img : null,
		username,
	});

	const savedPost = await post.save();
	const { updatedAt, __v, ...others } = savedPost.toJSON();

	res.status(200).json({ status: true, message: others });
});
