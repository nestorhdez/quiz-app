const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

let config = require('./config')[process.env.NODE_ENV];

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
        console.log('Connection to the database established...')

        app.listen(config.port, () => {
            console.log(`API Rest working: http://localhost:${config.port}`)
        })
    },
    err => {
        console.log(`Error connecting to the database: ${err}`)
    }
).catch(function(err) {
    console.log(`Error: ${err}`)
});