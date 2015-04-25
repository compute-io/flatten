/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	create = require( './../lib' ).createFlatten;


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-flatten:create', function tests() {

	it( 'should be a function', function test() {
		expect( create ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a positive integer array', function test() {
		var values = [
			'5',
			5,
			true,
			null,
			undefined,
			NaN,
			{},
			[],
			[1,0],
			[1,-1],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				create( value );
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
				create( [1,1], value );
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
				create( [1,1], {'copy':value} );
			};
		}
	});

	it( 'should return a function', function test() {
		var fcn;

		fcn = create( [1,1] );
		expect( fcn ).to.be.a( 'function' );

		fcn = create( [1,1], {} );
		expect( fcn ).to.be.a( 'function' );
	});

	it( 'should return a function which deep copies the flattened array', function test() {
		var fcn = create( [1,1], {
			'copy': true
		});
		expect( fcn ).to.be.a( 'function' );
	});

	it( 'should flatten an array', function test() {
		var actual,
			expected,
			flat,
			dims,
			arr;

		dims = [ 3, 3 ];

		flat = create( dims );

		arr = [
			[ 1, 2, 3 ],
			[ 4, 5, 6 ],
			[ 7, 8, 9 ]
		];

		actual = flat( arr );
		expected = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should flatten an array and deep copy', function test() {
		var actual,
			expected,
			flat,
			dims,
			arr;

		dims = [ 3, 3 ];

		flat = create( dims, {
			'copy': true
		});

		arr = [
			[ 1, 2, 3 ],
			[ 4, {'x':5}, 6 ],
			[ 7, 8, 9 ]
		];

		actual = flat( arr );
		expected = [ 1, 2, 3, 4, {'x':5}, 6, 7, 8, 9 ];

		assert.deepEqual( actual, expected );
		assert.notEqual( arr[1][1], actual[4] );
	});

});
