const express = require('express');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const router = require('./router');

const app = express();

app.use(cors(process.env.CORS_DOMAINS ?? '*'));
const bodyParser = multer();
 app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static('./public'));
app.use(bodyParser.none());
app.use(router);

module.exports = app;
