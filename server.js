'use strict';

const express       = require('express');
const logger        = require('morgan');
const bodyParser    = require('body-parser');

// short circuit evaluation:
// if NODE_ENV exists it will give us a false and will recognize we are in
// heroku environment and not in DEV env
// only load dotenv if we need it
const isDev         = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app           = express();

const PORT          = process.argv[2] || process.env.PORT || 3000;

// setting routes
const homeRoute     = require('./routes/home');
const tasksRoute    = require('./routes/tasks');

app.listen(PORT, () => console.log(`server RUNNIN on port ${PORT}`));

app.use(logger(isDev ? 'dev' : 'common'));

// this is to only accept json in our local API
app.use(bodyParser.json());

// Starting routes
// home route
app.use('/', homeRoute);
// tasks route
app.use('/tasks', tasksRoute);

// generic error handler
app.use((err, req, res, next) => {
  // if an error happens we want to be able to see what it is
  console.log(err, next);
  // but we want to tell the user there was a server issue.
  res.status(500).send('Something broke!');
});

