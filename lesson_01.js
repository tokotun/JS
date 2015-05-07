"use strict";
function sequence(start, step) {
	start = start|| 0;
	step = step|| 1;
	start = start - step;
	return function (){
		start = start + step;
		return start;
	};
}

