"use strict";
function take(gen, x) {
	var arr = [];
	for (var i = 0; i < x; i++) {
		arr.push(gen());
	};
	return arr;
	
}

function sequence(start, step) {
	start = start|| 0;
	step = step|| 1;
	start = start - step;
	return function (){
		start = start + step;
		return start;
	};
}

