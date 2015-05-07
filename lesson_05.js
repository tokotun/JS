"use strict";
function partial(fn) {
	var application = [];
	for (var i = 1; i < arguments.length; i++) {
		application.push(arguments[i]);
	}
	return function(){
		var g = [];
		for(var key in application) g[key] = application[key];
		for (var i = 0; i < arguments.length; i++) {
			g.push(arguments[i]);
		}
    	return fn.apply(this, g);
	}
}





    	

