class ErrorHandler extends Error {
	constructor(code, message) {
		super(message);
		this.status = false;
		this.code = code;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ErrorHandler;
