'use strict';

const express = require('express');
const config = require('config');
const redis = require('redis').createClient(config.get('redisUrl'));
const xtend = require('xtend');

const parkinglots = module.exports = express.Router();

parkinglots.get('/', all);

function all(req, res, next) {
  redis.hgetall('parkinglots', send);

  function send(err, results) {
    if (err) return next(err);
    const data = Object.keys(results).map(
      key => xtend(JSON.parse(results[key]), { id: key })
    );
    res.send(data);
  }
}
