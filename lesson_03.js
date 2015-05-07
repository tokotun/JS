"use strict";
function map(fn, array) {
	var newArray = []
	for (var i = 0;  i < array.length; i++) {
		newArray.push(fn(array[i]));
	};
	return newArray;
}

