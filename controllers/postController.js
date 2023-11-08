const express = require('express');
const uniqid = require('uniqid');

const asyncErrorMiddleware = require('../middleware/asyncErrorMiddleware');
const ErrorHandler = require('../tools/errorHandler');

const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.addPost = asyncErrorMiddleware(async (req, res) => {
	const username = req.username;

	const post = new Post({
		title: req.body.title,
		subtitle: req.body.subtitle || '',
		desc: req.body.desc,
		img: req.body.img ? req.body.img : null,
		username,
	});

	const savedPost = await post.save();
	const { updatedAt, __v, ...others } = savedPost.toJSON();

	res.status(200).json({ status: true, message: others });
});

exports.timeline = asyncErrorMiddleware(async (req, res) => {
	const username = req.username;

	const userPosts = await Post.find({ username });

	const currentUser = await User.findOne({ username });

	const friendsPosts = await Promise.all(
		currentUser.followings.map((username) => {
			return Post.find({ username });
		})
	);

	const posts = userPosts.concat(...friendsPosts);

	const filteredPosts = posts.map((post) => {
		const { __v, updatedAt, ...others } = post.toJSON();

		return others;
	});

	res.status(200).json({ status: 'success', message: filteredPosts });
});

exports.like = asyncErrorMiddleware(async (req, res) => {
	const username = req.username;

	try {
		const post = await Post.findById(req.params.id);

		if (post.likes.includes(username)) {
			await post.updateOne({ $pull: { likes: username } });
		} else {
			await post.updateOne({ $push: { likes: username } });
		}

		res.status(200).json({ status: true, message: 'Post has been liked' });
	} catch (err) {
		res.status(500).json(err);
	}
});

exports.comment = asyncErrorMiddleware(async (req, res) => {
	const username = req.username;

	const comment = {
		id: uniqid(),
		user: username,
		desc: req.body.desc,
		date: new Date(),
	};

	const post = await Post.findByIdAndUpdate(
		req.params.id,
		{
			$push: { comments: comment },
		},
		{ new: true }
	);

	res.status(200).json({ status: true, message: post });
});

exports.remove = asyncErrorMiddleware(async (req, res) => {
	const username = req.username;

	const post = await Post.findById(req.params.id);

	if (post.username === username) {
		post.deleteOne();
		res.status(200).json({ status: true, message: 'Post has been deleted' });
	} else {
		req.status(403).json({ status: false, message: 'Unauthorized action' });
	}
});

exports.userPosts = asyncErrorMiddleware(async (req, res) => {
	const userPosts = await Post.find({ username: req.params.username });

	const posts = userPosts.map((post) => {
		const { __v, updatedAt, ...others } = post.toJSON();

		return others;
	});

	res.status(200).json({ status: true, message: posts });
});
