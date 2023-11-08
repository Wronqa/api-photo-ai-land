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

const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', authRoute);
app.use('/api', postRoute);

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		public_id: (req, file) => file.originalname,
		folder: (req) => req.body.folder,
	},
});

const upload = multer({ storage: storage });

app.post(
	'/api/upload',
	verify,
	upload.single('image'),

	async (req, res) => {
		return res.status(200).json({ image: req.file.path });
	}
);

app.use(errorMiddleware);

module.exports = app;
