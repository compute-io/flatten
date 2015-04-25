'use strict';

var flatten = require( './../lib' );

var opts,
	dims,
	flat,
	arr,
	out;

// [0] Basic usage:
console.log( '\nBasic:\n' );

arr = [ 1, [2, [3, [4, [ 5 ], 6], 7], 8], 9 ];

out = flatten( arr );
console.log( out );
// returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]


// [1] Limiting depth:
console.log( '\nLimiting Depth:\n' );

opts = {
	'depth': 2
};

out = flatten( arr, opts );
console.log( out );
// returns [ 1, 2, 3, [4, [ 5 ], 6], 7, 8, 9 ]


// [2] Deep copy:
console.log( '\nDeep Copy:\n' );

opts = {
	'depth': 2,
	'copy': true
};

out = flatten( arr, opts );
console.log( out );
// returns [ 1, 2, 3, [4, [ 5 ], 6], 7, 8, 9 ]

console.log( arr[1][1][1] === out[3] );
// returns false


// [3] Matrix:
console.log( '\nMatrix:\n' );

arr = [
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
];

out = flatten( arr, {
	'matrix': true
});

console.log( out );
// returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]


// [4] Custom flatten function:
console.log( '\nCustom Flatten:\n' );

dims = [ 3, 3 ];

// Create a flatten function customized for flattening 3x3 arrays:
flat = flatten.createFlatten( dims );

arr = [
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
];

out = flat( arr );
console.log( out );
// returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]


// [5] Custom flatten function and deep copy:
console.log( '\nCustom Flatten and Deep Copy:\n' );

dims = [ 3, 3 ];
opts = {
	'copy': true
};

flat = flatten.createFlatten( dims, opts );

arr = [
	[ 1, 2, 3 ],
	[ 4, {'x':5}, 6 ],
	[ 7, 8, 9 ]
];

out = flat( arr );
console.log( out );
// returns [ 1, 2, 3, 4, {'x':5}, 6, 7, 8, 9 ]

console.log( arr[1][1] === out[4] );
// returns false
