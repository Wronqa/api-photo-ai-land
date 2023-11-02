const verify = (req, res, next) => {
	const token = req.cookies.access_token.accessToken;

	if (!token) {
		return res.status(401).json('You are not authetnicated');
	} else {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) res.status(401).json('Token is not valid');
			else {
				req.username = decoded.username;

				next();
			}
		});
	}
};

module.exports = verify;
