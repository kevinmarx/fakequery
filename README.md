# SpyQuery
[![Build Status](https://travis-ci.org/kevinmarx/spyquery.png?branch=master)](https://travis-ci.org/kevinmarx/spyquery?branch=master)


Emulates jQuery as sinon spies, so you can test code that uses jQuery on the server or in the browser.

## Installation

Nodejs:
```shell
npm install spyquery
```
Browser Global $:
```html
<script src="spyquery.js"></script>
```

## Usage

### Initialization
```javascript
var SpyQuery = require('spyquery')
var $ = new SpyQuery()
```

### Checking Spies
```javascript
> $('.foo').html()
> {}
> $.fn.html.callCount
> 1
```
You are able to check any of the attributes of a sinon spy.

### Example Usage In Tests
```javascript
var $
describe(function() {
  beforeEach(function(done) {
    $ = new SpyQuery()
    done()
  }
  
  it('should call hide once', function(done) {
    someFunctionWhereHideIsUsed()
    assert($.fn.hide.calledOnce, '$.hide() was called more than once')
    done()
  }
})
```
