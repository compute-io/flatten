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
* FUNCTION: createMatrixFcn( d, copy )
*	Returns a function to flatten a matrix.
*
* @private
* @param {Number[d]} d - matrix dimensions
* @param {Boolean} copy - indicates whether to deep copy flattened array elements
* @returns {Function} function which can be used to flatten a matrix having specified dimensions
*/
function createMatrixFcn( d, copy ) {
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
		fcn += 'for(i' + i + '=0;i' + i + '<d[' + i + '];i' + i + '++){';
	}
	fcn += 'o.push(';

	// Create the code which accesses the nested array values and pushes them onto the flattened array. Determine if we need to deep copy the array elements or not.
	if ( copy ) {

		// Deep copy...
		fcn += 'c(x';
		for ( i = 0; i < len; i++ ) {
			fcn += '[i' + i + ']';
		}
		fcn += '));';

		// Tidy up:
		for ( i = 0; i < len; i++ ) {
			fcn += '}';
		}
		fcn += 'return o;';

		// Create a new function:
		return new Function( 'x', 'd', 'c', fcn );
	}

	// No copy...
	fcn += 'x';
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
	return new Function( 'x', 'd', fcn );
} // end FUNCTION createMatrixFcn()


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
		fcn,
		d;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'flatten()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length ) {
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
		return arr;
	}
	if ( isMatrix ) {
		d = dims( arr, [], depth );
		fcn = createMatrixFcn( d, copy );
		if ( copy ) {
			return fcn( arr, d, createCopy );
		}
		return fcn( arr, d );
	}
} // end FUNCTION flatten()

/**
* FUNCTION: createFlatten( d [,opts] )
*	Creates a customized function for flattening arrays having specified dimensions.
*
* @param {Number[]} d - dimension array
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy] - indicates whether to deep copy array elements
* @returns {Function} function for flattening arrays having specified dimensions
*/
function createFlatten( d, opts ) {
	var copy = false;
	if ( !isPositiveIntegerArray( d ) ) {
		throw new TypeError( 'createFlatten()::invalid input argument. Dimensions must be a positive integer array. Value: `' + d + '`.' );
	}
	if ( arguments.length ) {
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
	return createMatrixFcn( d, copy );
} // end FUNCTION createFlatten()


// EXPORTS //

module.exports = flatten;
module.exports.createFlatten = createFlatten;
