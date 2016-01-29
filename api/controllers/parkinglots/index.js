'use strict';

const express = require('express');
const config = require('config');
const redis = require('redis').createClient(config.get('redisUrl'));

const format = require('./format_data');

const parkinglots = module.exports = express.Router();

parkinglots.get('/', all);

function all(req, res, next) {
  redis.hgetall('parkinglots', send);

  function send(err, results) {
    if (err) return next(err);
    res.send(format(results));
  }
}
