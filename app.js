const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', authRoute);

app.use(errorMiddleware);

module.exports = app;
