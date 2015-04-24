'use strict';

var flatten = require( './../lib' );

var arr, out;


// Matrix:
arr = [
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
];

out = flatten( arr, {
	'matrix': true
});

console.log( out );

