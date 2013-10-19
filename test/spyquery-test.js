var assert = require('assert')
var _ = require('underscore')
var SpyQuery = require('../spyquery')

var $ = new SpyQuery()

beforeEach(function(done) {
  $ = new SpyQuery()
  done()
})

describe('SpyQuery', function() {

  it('should be an instance', function() {
    assert(typeof $ === 'function')
    assert(typeof $.fn === 'object')
  })

  it('should return a value for each method', function() {
    _.each($.fn, function(method, key) {
      var value

      switch ($('.foo')[method]()) {
        case void 0:
          value = true
          break
        case '':
          value = true
          break
        case []:
          value = true
          break
        case {}:
          value = true
          break
        default:
          value = false;
      }

      assert(value, key + 'did not return a proper value.')

    })
  })

  it('should record spy information', function() {
    _.each($.fn, function(method, key) {
      $('.foo')[method]()

      var method = $.fn[method]

      assert(method.calledOnce, key + 'was called more than once')
      assert(method.firstCall)
      assert(method.callCount, key + 'has no callCount')
    })

  })
})

