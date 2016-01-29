'use strict';

const xtend = require('xtend');
module.exports = format;

function format(data) {
  return Object.keys(data).map(
    key => xtend(JSON.parse(data[key]), { id: key })
  );
}
