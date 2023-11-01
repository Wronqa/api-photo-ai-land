const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel');
const express = require('express');
const router = express.Router();
const asyncErrorMiddleware = require('../middleware/asyncErrorMiddleware');
const ErrorHandler = require('../tools/errorHandler');

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
		const errorMessage = user.email ===email ? 'email' : 'username'
		return next(new ErrorHandler(400, `User with this ${errorMessage} already exist`));
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
