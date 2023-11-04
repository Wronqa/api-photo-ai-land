const jwt = require('jsonwebtoken');
const asyncErrorMiddleware = require('./asyncErrorMiddleware');
const ErrorHandler = require('../tools/errorHandler');

const verify = asyncErrorMiddleware((req, res, next) => {
	let token;

	if (!req.cookies.access_token)
		return next(new ErrorHandler(401, 'You are not authenticated'));
	else {
		token = req.cookies.access_token.accessToken;
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) return next(new ErrorHandler(401, 'Token is not valid'));
			else {
				req.username = decoded.username;

				next();
			}
		});
	}
});

module.exports = verify;
