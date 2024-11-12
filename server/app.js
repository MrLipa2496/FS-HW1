const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { errorHandlers } = require('./middleware');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.errorHandler);

module.exports = app;
