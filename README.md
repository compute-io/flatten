flatten
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Flattens an array containing nested arrays.


## Installation

``` bash
$ npm install compute-flatten
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var foo = require( 'compute-flatten' );
```

#### foo( arr )

What does this function do?


## Examples

``` javascript
var foo = require( 'compute-flatten' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-flatten.svg
[npm-url]: https://npmjs.org/package/compute-flatten

[travis-image]: http://img.shields.io/travis/compute-io/flatten/master.svg
[travis-url]: https://travis-ci.org/compute-io/flatten

[coveralls-image]: https://img.shields.io/coveralls/compute-io/flatten/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/flatten?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/flatten.svg
[dependencies-url]: https://david-dm.org/compute-io/flatten

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/flatten.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/flatten

[github-issues-image]: http://img.shields.io/github/issues/compute-io/flatten.svg
[github-issues-url]: https://github.com/compute-io/flatten/issues
