/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	flatten = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-flatten', function tests() {

	it( 'should export a function', function test() {
		expect( flatten ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			true,
			null,
			undefined,
			NaN,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				flatten( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			null,
			undefined,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				flatten( [], value );
			};
		}
	});

	it( 'should throw an error if provided a `matrix` option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				flatten( [], {'matrix':value} );
			};
		}
	});

	it( 'should throw an error if provided a `depth` option which is not a nonnegative integer', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				flatten( [], {'depth':value} );
			};
		}
	});

	it( 'should throw an error if provided a `copy` option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				flatten( [], {'copy':value} );
			};
		}
	});

	it( 'should flatten an array', function test() {
		var actual, expected, arr;

		arr = [ 1, [2, [3, [4, [ 5 ], 6], 7], 8], 9 ];

		actual = flatten( arr );
		expected = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should flatten to a specified depth', function test() {
		var actual, expected, arr;

		arr = [ 1, [2, [3, [4, [ 5 ], 6], 7], 8], 9 ];

		actual = flatten( arr, {
			'depth': 2
		});
		expected = [ 1, 2, 3, [4, [5], 6], 7, 8, 9 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return the input array if the depth is 0', function test() {
		var actual, expected, arr;

		arr = [ 1, [2, [3, [4, [ 5 ], 6], 7], 8], 9 ];

		actual = flatten( arr, {
			'depth': 0
		});
		expected = arr;

		assert.deepEqual( actual, expected );
		assert.strictEqual( actual, expected );
	});

	it( 'should flatten an array and deep copy', function test() {
		var actual, expected, arr;

		arr = [ 1, [2, [3, [4, [ 5 ], 6], 7], 8], 9 ];

		actual = flatten( arr, {
			'depth': 2,
			'copy': true
		});
		expected = [ 1, 2, 3, [4, [5], 6], 7, 8, 9 ];

		assert.deepEqual( actual, expected );
		assert.notEqual( arr[1][1][1], actual[3] );
	});

	it( 'should flatten a matrix', function test() {
		var actual, expected, arr;

		arr = [
			[ 1, 2, 3 ],
			[ 4, 5, 6 ],
			[ 7, 8, 9 ]
		];

		actual = flatten( arr, {
			'matrix': true
		});
		expected = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

		assert.deepEqual( actual, expected );
	});

});
