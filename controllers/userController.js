const { body, validationResult, check } = require('express-validator');
const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../tools/errorHandler');

const User = require('../models/userModel');
const asyncErrorMiddleware = require('../middleware/asyncErrorMiddleware');

exports.changePassword = asyncErrorMiddleware(async (req, res, next) => {
	const username = req.username;
	const { password, confrimPasword, newPassword } = req.body;

	const user = await User.findOne({ username });

	bcrypt.compare(password, user.password, (err, result) => {
		if (!result) {
			return next(new ErrorHandler(400, 'Wrong password'));
		} else {
			bcrypt.genSalt(+process.env.SALT_ROUNDS, (err, salt) => {
				bcrypt.hash(newPassword, salt, async (err, hash) => {
					if (!err) {
						///nie jestem pewien
						await user.updateOne({ $set: { password: hash } });
						res.status(200).json({
							status: 'success',
							message: 'Password changed successully!',
						});
					} else {
						res.status(500);
					}
				});
			});
		}
	});
});

exports.editEmail = asyncErrorMiddleware(async (req, res, next) => {
	const username = req.username;
	let { email, password } = req.body;

	console.log(email);

	const user = await User.findOne({ username });

	bcrypt.compare(password, user.password, async (err, result) => {
		if (!result) {
			return next(new ErrorHandler(400, 'Wrong password'));
		} else {
			const updatedUser = await User.findOneAndUpdate(
				{ username: username },
				{
					$set: {
						email: req.body.email,
					},
				},
				{ new: true }
			);
			res.status(200).json({ status: 'success', message: updatedUser });
		}
	});
});
