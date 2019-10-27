const express = require('express');
const app = express();
const cors = require('cors');
const quizApp = require('./app/routes');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', quizApp);

module.exports = app;