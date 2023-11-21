const { body, validationResult, check } = require('express-validator');
const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../tools/errorHandler');
const asyncErrorMiddleware = require('../middleware/asyncErrorMiddleware');
const { Configuration, OpenAI } = require('openai');

exports.generateArticle = asyncErrorMiddleware(async (req, res, next) => {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

	const { prompt } = req.body;

	const chatCompletion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: prompt }],
	});

	console.log(chatCompletion.choices[0]);

	res
		.status(200)
		.json({ status: true, message: chatCompletion.choices[0].message.content });
});
