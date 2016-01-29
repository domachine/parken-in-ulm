'use strict';

const util = require('util');
const http = require('http');
const express = require('express');

const app = express();

app.use('/api', require('./api'));

http.createServer(app).listen(process.env.PORT || 3000, () => {
  util.log('Listening ...');
});
