/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint strict: ["error", {"global": true}] */

'use strict';

// regular stuff
const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');

// This tests to see if we have NODE_ENV in our environment.
// Only load the dotenv if we need it.
const isDev       = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app         = express();
const PORT        = process.argv[2] || process.env.port || 3000;

// set up some logging
app.use(logger(isDev ? 'dev' : 'common'));

// we're only going to accept json
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!', next);
});

// Let's go!
app.listen(PORT, () => {
  console.log(process.env, isDev);
});
