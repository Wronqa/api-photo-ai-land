const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const verify = require('./middleware/authMiddleware');
const uniqid = require('uniqid');

const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const uploadRoute = require('./routes/uploadRoute');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json());

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, process.cwd() + '/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, uniqid().toString());
	},
});

const upload = multer({
	storage: storage,
	limits: { fieldSize: 25 * 1024 * 1024 },
});

app.use('/api', authRoute);
app.use('/api', postRoute);
app.use('/api/upload', upload.array('image'), uploadRoute);

app.use(errorMiddleware);

module.exports = app;
