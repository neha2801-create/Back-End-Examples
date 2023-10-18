'use strict';

import test from 'tape';
import has from '../';

test('has', function (t) {
  t.equal(has({}, 'hasOwnProperty'), false, 'object literal does not have own property "hasOwnProperty"');
  t.equal(has(Object.prototype, 'hasOwnProperty'), true, 'Object.prototype has own property "hasOwnProperty"');
  t.end();
});
