"use strict";
function partialAny(fn) {
	var application = [];
	for (var i = 1; i < arguments.length; i++) {
		application.push(arguments[i]);
	}
	return function(){
		var g = [];
		var i = 0;
		for(var key in application) {
			g[key] = application[key];

			if (g[key] === undefined) {
				g[key] = arguments[i];
				i++;
			}
		}
    	return fn.apply(this, g);
	}
}





    	

