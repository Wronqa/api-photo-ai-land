const jwt = require('jsonwebtoken');

const generateAccessToken = (username) => {
	const accessToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME,
	});
	return accessToken;
};

const generateRefreshToken = (username) => {
	const accessToken = jwt.sign(
		{ username },
		process.env.JWT_REFRESH_SECRET_KEY,
		{
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_TIME,
		}
	);
	return accessToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
