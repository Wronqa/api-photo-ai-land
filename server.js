const normalizePort = require('./tools/normalizePort');
const { app } = require('./app');
const connectToDatabase = require('./tools/database');

connectToDatabase();

app.listen(normalizePort(process.env.SERVER_PORT) || 3000, () => {
	console.log('Server started on port ' + process.env.SERVER_PORT);
});

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', reason.stack || reason);
});

process.on('uncaughtException', (error) => {
	console.log('UncaughtException: ', error);

	process.exit(1);
});
