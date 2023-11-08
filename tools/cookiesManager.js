const sendCookies = (res, refreshToken, accessToken) => {
	res.status(200).cookie(
		'refresh_token',
		{
			refreshToken,
		},
		{
			path: '/auth/',
			httpOnly: true,
			secure: true,
		}
	);
	res.cookie(
		'access_token',
		{
			accessToken,
		},
		{
			httpOnly: true,
			secure: true,
		}
	);
};

module.exports = sendCookies;
