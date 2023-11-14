const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt_decode = require('jwt-decode');
const User = require('../models/userModel');
const express = require('express');
const router = express.Router();
const asyncErrorMiddleware = require('../middleware/asyncErrorMiddleware');
const ErrorHandler = require('../tools/errorHandler');
const { generateAccessToken } = require('../tools/jwtManager');
const { generateRefreshToken } = require('../tools/jwtManager');
const sendCookies = require('../tools/cookiesManager.js');
let tokens = [];

exports.registerUser = asyncErrorMiddleware(async (req, res, next) => {
	let { email, password, username } = req.body;

	if (!email || !username || !password) {
		return next(new ErrorHandler(401, 'Invalid email, username, or password'));
	}

	email = validator.escape(email);
	passowrd = validator.escape(password);
	username = validator.escape(username);

	const user = await User.findOne({
		$or: [{ username }, { email }],
	});

	if (user) {
		const errorMessage = user.email === email ? 'email' : 'username';
		return next(
			new ErrorHandler(400, `User with this ${errorMessage} already exist`)
		);
	}

	bcrypt.genSalt(+process.env.SALT_ROUNDS, (err, salt) => {
		bcrypt.hash(password, salt, async (err, hash) => {
			const user = new User({
				username,
				email,
				password: hash,
			});

			try {
				await user.save();
				res
					.status(200)
					.json({ status: true, message: 'Registration successfully' });
			} catch (err) {
				console.log(err);
			}
		});
	});
});

exports.loginUser = asyncErrorMiddleware(async (req, res, next) => {
	let { email, password } = req.body;

	email = validator.escape(email);
	password = validator.escape(password);

	if (!password || !email) {
		return next(new ErrorHandler(404, 'Invalid username or password'));
	}

	const user = await User.findOne({ email });

	if (!user) return next(new ErrorHandler(404, 'Invalid username or password'));

	bcrypt.compare(password, user.password, (err, result) => {
		if (!result)
			return next(new ErrorHandler(400, 'Invalid username or password'));

		const accessToken = generateAccessToken(user.username);
		const refreshToken = generateRefreshToken(user.username);

		tokens.push(refreshToken);

		sendCookies(res, refreshToken, accessToken);

		const { _id, password, createdAt, updatedAt, __v, ...other } =
			user.toJSON();

		res.status(200).json({ status: true, message: other });
	});
});

exports.checkUser = asyncErrorMiddleware(async (req, res) => {
	const username = req.username;

	try {
		const user = await User.findOne({ username });

		const { _id, password, createdAt, updatedAt, __v, ...other } =
			user.toJSON();

		res.status(200).json({ status: 'success', message: other });
	} catch (err) {
		res.status(500).json(err);
	}
});
