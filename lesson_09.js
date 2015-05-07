"use strict";
function filter (arr, fn) {
    var g = [];
    for(var i in arr) {
        if (fn(arr[i])){
            g.push(arr[i]);
        };
        i++;
    }
    return g;
}
