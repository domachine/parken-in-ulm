'use strict';

const express = require('express');

const api = module.exports = express();

api.use('/parkinglots', require('./controllers/parkinglots'));
