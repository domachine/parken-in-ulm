'use strict';

const xtend = require('xtend');
module.exports = format;

function format(data) {
  return Object.keys(data || {}).map(
    key => {
      const object = JSON.parse(data[key]);
      return xtend(object, {
        id: key,
        total: parseInt(object.total || 0, 10),
        available: parseInt(object.available || 0, 10),
      });
    }
  );
}
