const errorMiddleware = (err, req, res, next) => {
	console.log(err);
	const message = err.message || 'Invalid server error';
	const status = err.status;
	const code = err.code || 500;

	res.status(code).json({
		status,
		message,
	});
};

module.exports = errorMiddleware;
