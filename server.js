'use strict';

const util = require('util');
const http = require('http');
const express = require('express');
const rewrite = require('connect-modrewrite');

const app = express();

app.use('/api', require('./api'));
app.use(rewrite(['^[^.]*$ /index.html']));
app.use(express.static(`${__dirname}/static`));

http.createServer(app).listen(process.env.PORT || 3000, () => {
  util.log('Listening ...');
});
