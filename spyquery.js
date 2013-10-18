// SpyQuery 0.0.1
//
// (c) Kevin Marx
// forked from www.github.com/tgriesser/fakequery
// License: MIT
//
// For all details and documentation:
// www.github.com/kevinmarx/spyquery

(function (root, factory) {
  if ( module && typeof module.exports === 'object' ) { // node.js
    var underscore = require('underscore')
    var sinon = require('sinon')
    module.exports = factory(underscore, sinon)
  } else if (typeof define === 'function' && define.amd) { // require.js
    define(['underscore', 'sinon'], factory)
  } else { // browser globals
    root.$ = factory(root._, root.sinon)
  }
}(this, function (_, sinon) { 'use strict'

  // These methods return values... we'll return undefined.
  var valueMethods  = ["val", "attr", "width", "height"];

  // These methods return strings... we'll return an empty string.
  var stringMethods = ["html", "serialize"];

  // Methods returning arrays... we'll return an empty array.
  var arrayMethods = ["serializeArray", "toArray"];

  // All of the functions contained on the $.fn prototype.
  var chainMethods = [
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
    "toArray", "toggle", "toggleClass", "trigger", "triggerHandler", "unbind", "undelegate",
    "unload", "unwrap", "wrap", "wrapAll", "wrapInner"
  ];

  var coreMethods = [
    "Animation", "Callbacks", "Deferred", "Event", "Tween",
    "_data", "_queueHooks", "abovethetop", "acceptData", "access", "ajax",
    "ajaxPrefilter", "ajaxSetup", "ajaxTransport", "attr", "belowthefold",
    "buildFragment", "camelCase", "clean", "cleanData", "clone", "contains",
    "css", "data", "dequeue", "dir", "error", "extend", "filter",
    "find", "fx", "get", "getJSON", "getScript", "globalEval", "grep",
    "hasData", "holdReady", "inArray", "inviewport", "isArray", "isEmptyObject",
    "isFunction", "isNumeric", "isPlainObject", "isWindow", "isXMLDoc", "leftofbegin",
    "merge", "noConflict", "nodeName", "noop", "now", "param",
    "parseHTML", "parseJSON", "parseXML", "post", "prop", "proxy", "queue", "ready",
    "removeAttr", "removeData", "removeEvent", "rightoffold", "sibling", "speed",
    "style", "sub", "swap", "text", "trim", "type", "uaMatch", "unique", "when"
  ];

  var allMethods = _.union(valueMethods, stringMethods, arrayMethods, chainMethods)

  function init(selector, context) {
    // Handle $($);
    if (selector instanceof $) return selector;

    // Handle $(function() {});
    if (typeof selector === 'function') {
      return setTimeout(selector, 0);
    }

    // HANDLE: $(""), $(null), $(undefined), $(false), $("anything else")
    return this;
  };

  var SpyQuery = function() {

    var $ = function(selector, context) {
      return new $.fn.init(selector, context);
    };

    $.fn = $.prototype = {
      length: 0
    };

    _.each(allMethods, function(item) {
      $.fn[item] = function() {}

      switch (true) {
        case !!~valueMethods.indexOf(item):
          sinon.stub($.fn, item, function() { return void 0 });
          break;
        case !!~stringMethods.indexOf(item):
          sinon.stub($.fn, item, function() { return '' });
          break;
        case !!~arrayMethods.indexOf(item):
          sinon.stub($.fn, item, function() { return [] });
          break;
        case !!~chainMethods.indexOf(item):
          sinon.stub($.fn, item, function() { return $(this) });
          break;
      }
    })

    $.fn.init = init

    $.fn.init.prototype = $.fn;

    $.extend = function() {};
    $.each = function() {};
    $.map = function() {};
    $.makeArray = function() {};

    sinon.stub($, 'extend', function() { return _.extend.bind(_, arguments) });
    sinon.stub($, 'each', function() { return _.each.bind(_, arguments) });
    sinon.stub($, 'map', function() { return _.map.bind(_, arguments) });
    sinon.stub($, 'makeArray', function() { return _.toArray.bind(_, arguments) });


    return $;
  }

  return SpyQuery

}))
