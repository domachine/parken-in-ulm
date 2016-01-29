'use strict';

const tap = require('tap');
const format = require('./format_data');

tap.test('formats the data properly', (t) => {
  const data = {
    frauenstrasse: JSON.stringify({
      name: 'Frauenstraße',
      total: '780',
      available: '335',
      open: 'täglich durchgehend 24 Stunden',
    }),
    fischerviertel: JSON.stringify({
      name: 'Fischerviertel',
      total: '395',
      available: '195',
      open: 'täglich durchgehend 24 Stunden',
    }),
    kornhaus: JSON.stringify({
      name: 'Kornhaus',
      total: '135',
      available: '',
      open: 'mo - fr 10.30 - 24 Uhr, sa und so 6.30 - 24 Uhr',
    }),
  };
  const expected = [
    {
      name: 'Frauenstraße',
      total: '780',
      available: '335',
      open: 'täglich durchgehend 24 Stunden',
      id: 'frauenstrasse',
    },
    {
      name: 'Fischerviertel',
      total: '395',
      available: '195',
      open: 'täglich durchgehend 24 Stunden',
      id: 'fischerviertel',
    },
    {
      name: 'Kornhaus',
      total: '135',
      available: '',
      open: 'mo - fr 10.30 - 24 Uhr, sa und so 6.30 - 24 Uhr',
      id: 'kornhaus',
    },
  ];
  t.deepEqual(format(data), expected);
  t.end();
});
