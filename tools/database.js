const mongoose = require('mongoose');

const connectToDatabase = () =>
	mongoose.connect(process.env.DATABASE_URL, () => {
		console.log('Connected to database');
	});

module.exports = connectToDatabase;
