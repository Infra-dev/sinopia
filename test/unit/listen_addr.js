var assert = require('assert')
var parse  = require('../../lib/utils').parse_address

describe('Parse address', function() {
  function addTest(what, proto, host, port) {
    it(what, function() {
      if (proto === null) {
        assert.strictEqual(parse(what), null)
      } else {
        assert.deepEqual(parse(what), {
          proto: proto,
          host: host,
          port: port,
        })
      }
    })
  }

  addTest('4873', 'http', 'localhost', '4873')
  addTest(':4873', 'http', 'localhost', '4873')
  addTest('blah:4873', 'http', 'blah', '4873')
  addTest('http://:4873', 'http', 'localhost', '4873')
  addTest('https::4873', 'https', 'localhost', '4873')
  addTest('https:blah:4873', 'https', 'blah', '4873')
  addTest('https://blah:4873/', 'https', 'blah', '4873')
  addTest('[::1]:4873', 'http', '::1', '4873')
  addTest('https:[::1]:4873', 'https', '::1', '4873')

  addTest('blah', null)
  addTest('blah://4873', null)
  addTest('https://blah:4873///', null)
})
