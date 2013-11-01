var assert = require('assert')
var _ = require('underscore')
var SpyQuery = require('../spyquery')

var $ = new SpyQuery()

beforeEach(function(done) {
  $ = new SpyQuery()
  done()
})

describe('SpyQuery', function() {

  it('should be an instance', function(done) {
    assert(typeof $ === 'function')
    assert(typeof $.fn === 'object')
    done()
  })

  it('should contain all the methods', function(done) {
    var methods = [
      "val", "attr", "width", "height", "html", "serialize", "serializeArray", "toArray",
      "add", "addBack", "addClass", "after", "ajaxComplete",
      "ajaxError", "ajaxSend", "ajaxStart", "ajaxStop", "ajaxSuccess",
      "andSelf", "animate", "append", "appendTo", "before",
      "bind", "blur", "change", "children", "clearQueue", "click",
      "clone", "closest", "contents", "contextmenu",
      "css", "data", "dblclick", "delay", "delegate", "dequeue",
      "detach", "die", "domManip", "each", "empty", "end", "eq",
      "error", "extend", "fadeIn", "fadeOut", "fadeTo", "fadeToggle",
      "filter", "find", "first", "focus", "focusin", "focusout", "get",
      "has", "hasClass", "hide", "hover", "index",
      "innerHeight", "innerWidth", "insertAfter", "insertBefore", "is",
      "keydown", "keypress", "keyup", "last", "lazyload", "live",
      "load", "map", "mousedown", "mouseenter", "mouseleave",
      "mousemove", "mouseout", "mouseover", "mouseup", "next",
      "nextAll", "nextUntil", "not", "off", "offset", "offsetParent",
      "on", "one", "outerHeight", "outerWidth", "parent", "parents",
      "parentsUntil", "position", "prepend", "prependTo", "prev", "prevAll",
      "prevUntil", "promise", "prop", "push", "pushStack", "queue", "ready",
      "remove", "removeAttr", "removeClass", "removeData", "removeProp",
      "replaceAll", "replaceWith", "resize", "scroll", "scrollLeft",
      "scrollTop", "select", "show", "siblings", "size", "slice", "slideDown",
      "slideToggle", "slideUp", "sort", "splice", "stop", "submit", "text",
      "toggle", "toggleClass", "trigger", "triggerHandler", "unbind", "undelegate",
      "unload", "unwrap", "wrap", "wrapAll", "wrapInner"
    ];

    for (var key in $.fn) {
      var index = methods.indexOf(key)
      if (~index) methods.splice(index, 1)
    }
    assert(_.isEmpty(methods), 'not all the methods were set on the $.fn object')
    done()
  })

  it('should have all the core methods on the $ object directly', function(done) {
    var coreMethods = [
      'Animation', 'Callbacks', 'Deferred', 'Event', 'Tween', '_data', '_queueHooks', 'abovethetop',
      'acceptData', 'access', 'ajax', 'ajaxPrefilter', 'ajaxSetup', 'ajaxTransport',
      'attr', 'belowthefold', 'buildFragment', 'camelCase', 'clean', 'cleanData',
      'contains', 'dir', 'fx', 'getJSON', 'getScript', 'globalEval', 'grep', 'hasData',
      'holdReady', 'inArray', 'inviewport', 'isArray', 'isEmptyObject', 'isFunction', 'isNumeric',
      'isPlainObject', 'isWindow', 'isXMLDoc', 'leftofbegin', 'merge', 'noConflict',
      'nodeName', 'noop', 'now', 'param', 'parseHTML', 'parseJSON', 'parseXML',
      'post', 'proxy', 'removeEvent', 'rightoffold', 'sibling', 'speed', 'style',
      'sub', 'swap', 'trim', 'type', 'uaMatch', 'unique', 'when', 'then'
    ];

    for (var key in $) {
      var index = coreMethods.indexOf(key)
      if (~index) coreMethods.splice(index, 1)
    }

    assert(_.isEmpty(coreMethods), 'not all core methods were set on the $ object')
    done()
  })

  it('should return a value for each method', function(done) {
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
    done()
  })

  it('should record spy information', function(done) {
    _.each($.fn, function(method, key) {
      $('.foo')[method]()

      var method = $.fn[method]

      assert(method.calledOnce, key + 'was called more than once')
      assert(method.firstCall)
      assert(method.callCount, key + 'has no callCount')
    })

    done()
  })
})

