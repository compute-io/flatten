Flatten
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Flattens an array.


## Installation

``` bash
$ npm install compute-flatten
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var flatten = require( 'compute-flatten' );
```

#### flatten( arr[, options] )

Flattens an `array`.

``` javascript
var arr = [ 1, [2, [3, [4, [ 5 ], 6], 7], 8], 9 ];

var out = flatten( arr );
// returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

The `function` accepts the following `options`:
-	__depth__: nonnegative `integer` specifying the depth to which the input `array` should be flattened. Default: `Number.POSITIVE_INFINITY`.
-	__matrix__: `boolean` indicating whether the function can assume that the input `array` is a matrix; i.e., an `array` (of `arrays`) having uniform dimensions. Default: `false`.
-	__copy__: `boolean` indicating whether `array` elements should be [deep copied](https://github.com/kgryte/utils-copy). Default: `false`.

To limit the depth to which the input `array` is flattened, set the `depth` option:

``` javascript
var opts = {
	'depth': 2	
};

var out = flatten( arr, opts );
// returns [ 1, 2, 3, [4, [ 5 ], 6], 7, 8, 9 ]
```

To [deep copy](https://github.com/kgryte/utils-copy) flattened `array` elements, set the `copy` option to `true`.

``` javascript
var opts = {
	'depth': 2,
	'copy': true
};

var out = flatten( arr, opts );
// returns [ 1, 2, 3, [4, [ 5 ], 6], 7, 8, 9 ]

console.log( arr[1][1][1] === out[3] );
// returns false
```

To indicate that the function may assume that the input `array` is a matrix, set the `matrix` option to `true`.

``` javascript
var arr = [
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
];

var opts = {
	'matrix': true
};

var out = flatten( arr, opts );
// returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

__Notes__:
-	this `function` handles the generic case where an `array` may be heterogeneous (contain mixed data types) or have unknown dimensions. 
-	if repeatedly flattening `arrays` having the same dimensions, create a customized flatten `function`, as documented below.



#### flatten.createFlatten( dims[, options] )

Returns a customized `function` for flattening `arrays` having specified dimensions.

``` javascript
var dims = [ 3, 3 ];

// Create a flatten function customized for flattening 3x3 arrays:
var flat = flatten.createFlatten( dims );

var arr = [
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
];

var out = flat( arr );
// returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

The `function` accepts the following `options`:
-	__copy__: `boolean` indicating whether `array` elements should be [deep copied](https://github.com/kgryte/utils-copy). Default: `false`.


To [deep copy](https://github.com/kgryte/utils-copy) flattened `array` elements, set the `copy` option to `true`.

``` javascript
var dims = [ 3, 3 ];

var opts = {
	'copy': true
};

var flat = flatten.createFlatten( dims, opts );

var arr = [
	[ 1, 2, 3 ],
	[ 4, {'x':5}, 6 ],
	[ 7, 8, 9 ]
];

var out = flat( arr );
// returns [ 1, 2, 3, 4, {'x':5}, 6, 7, 8, 9 ]

console.log( arr[1][1] === out[4] );
// returns false
```


__Notes__:
-	when repeatedly flattening `arrays` having the same shape, creating and applying a customized `flatten` function will provide performance benefits.
-	__no__ attempt is made to validate that input `arrays` actually have the specified dimensions. Input values are __assumed__ to be valid `arrays`. If validation is needed, see [validate.io-size](https://github.com/validate-io/size).




## Examples

``` javascript
var flatten = require( 'compute-flatten' );

var xStride,
	yStride,
	zStride,
	data,
	tmp1,
	tmp2,
	arr,
	val,
	N, M, L,
	i, j, k;

N = 1000;
M = 100;
L = 10;

// Create a 3D array...
data = new Array( N );
for ( i = 0; i < N; i++ ) {
	tmp1 = new Array( M );
	for ( j = 0; j < M; j++ ) {
		tmp2 = new Array( L );
		for ( k = 0; k < L; k++ ) {
			tmp2[ k ] = M*L*i + j*L + k + 1;
		}
		tmp1[ j ] = tmp2;
	}
	data[ i ] = tmp1;
}
// Create a flattened (strided) array:
arr = flatten( data );

// To access the data[4][20][2] element...
xStride = M * L;
yStride = L;
zStride = 1;
val = arr[ 4*xStride + 20*yStride + 2*zStride ];

console.log( val );
// returns 4203

console.log( data[4][20][2] === val );
// returns true
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
