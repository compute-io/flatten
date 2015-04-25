'use strict';

// MODULES //

var createCopy = require( 'utils-copy' ),
	isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isBoolean = require( 'validate.io-boolean-primitive');


// FUNCTIONS //

/**
* FUNCTION: dims( arr, d, depth )
*	Determines matrix dimensions.
*
* @param {Array} arr - input array
* @param {Number[]} d - dimensions array
* @param {Number} depth - maximum number of dimensions
* @returns {Number[]} array of dimensions
*/
function dims( arr, d, depth ) {
	if ( depth && isArray( arr ) ) {
		d.push( arr.length );
		dims( arr[ 0 ], d, depth-1 );
	}
	return d;
} // end FUNCTION dims()

/**
* FUNCTION: createMatrixFcn( d )
*	Returns a function to flatten a matrix.
*
* @private
* @param {Number[d]} d - matrix dimensions
* @returns {Function} function which can be used to flatten a matrix having specified dimensions
*/
function createMatrixFcn( d ) {
	var len = d.length,
		n = len - 1,
		fcn,
		i;

	// Code generation. Create the variables...
	fcn = 'var o=[];var ';
	for ( i = 0; i < len; i++ ) {
		fcn += 'i' + i;
		if ( i < n ) {
			fcn += ',';
		} else {
			fcn += ';';
		}
	}
	// Create the nested for loops...
	for ( i = 0; i < len; i++ ) {
		fcn += 'for(i' + i + '=0;i' + i + '<' + d[ i ] + ';i' + i + '++){';
	}
	// Create the code which accesses the nested array values and pushes them onto the flattened array.
	fcn += 'o.push(x';
	for ( i = 0; i < len; i++ ) {
		fcn += '[i' + i + ']';
	}
	fcn += ');';

	// Tidy up:
	for ( i = 0; i < len; i++ ) {
		fcn += '}';
	}
	fcn += 'return o;';

	// Create a new function:
	return new Function( 'x', fcn );
} // end FUNCTION createMatrixFcn()

/**
* FUNCTION: recurse( out, arr, depth )
*	Recursively flattens an array.
*
* @private
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Number} depth - recursion depth
* @returns {Array} flattened array
*/
function recurse( out, arr, depth ) {
	var len = arr.length,
		val,
		i;

	for ( i = 0; i < len; i++ ) {
		val = arr[ i ];
		if ( depth && isArray( val ) ) {
			recurse( out, val, depth-1 );
		} else {
			out.push( val );
		}
	}
	return out;
} // end FUNCTION recurse()


// FLATTEN //

/**
* FUNCTION: flatten( arr[, options] )
*	Flattens an array.
*
* @param {Array} arr - input array
* @param {Object} [options] - function options
* @param {Number} [options.depth=Infinity] - maximum depth
* @param {Boolean} [options.matrix=false] - indicates whether the input array can be regarded as a matrix; i.e., all elements having same array dimensions
* @param {Boolean} [options.copy=false] - indicates whether array elements should be deep copied
* @returns {Array} flattened array
*/
function flatten( arr, opts ) {
	var isMatrix = false,
		depth = Number.POSITIVE_INFINITY,
		copy = false,
		out,
		fcn,
		d;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'flatten()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'flatten()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'matrix' ) ) {
			isMatrix = opts.matrix;
			if ( !isBoolean( isMatrix ) ) {
				throw new TypeError( 'flatten()::invalid option. Matrix option must be a boolean primitive. Option: `' + isMatrix + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'depth' ) ) {
			depth = opts.depth;
			if ( !isNonNegativeInteger( depth ) ) {
				throw new TypeError( 'flatten()::invalid option. Depth option must be a nonnegative integer. Option: `' + depth + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'flatten()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
	}
	if ( depth === 0 ) {
		out = arr;
	}
	else if ( isMatrix ) {
		d = dims( arr, [], depth );
		fcn = createMatrixFcn( d );
		out = fcn( arr );
	}
	else {
		out = recurse( [], arr, depth );
	}
	if ( copy ) {
		return createCopy( out );
	}
	return out;
} // end FUNCTION flatten()


// CREATE FLATTEN //

/**
* FUNCTION: createFlatten( d[, opts] )
*	Creates a customized function for flattening arrays having specified dimensions.
*
* @param {Number[]} d - dimension array
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy] - indicates whether to deep copy array elements
* @returns {Function} function for flattening arrays having specified dimensions
*/
function createFlatten( d, opts ) {
	var copy = false,
		fcn;
	if ( !isPositiveIntegerArray( d ) ) {
		throw new TypeError( 'createFlatten()::invalid input argument. Dimensions must be a positive integer array. Value: `' + d + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'createFlatten()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'createFlatten()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
	}
	fcn = createMatrixFcn( d );
	if ( copy ) {
		return function flatten( arr ) {
			return createCopy( fcn( arr ) );
		};
	}
	return fcn;
} // end FUNCTION createFlatten()


// EXPORTS //

module.exports = flatten;
module.exports.createFlatten = createFlatten;
