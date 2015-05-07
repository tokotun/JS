"use strict";
function pluck(objects, fieldName) {
    var g = [];
    for(var i in objects) {
        g.push(objects[i][fieldName]);
        i++;
    }
    return g;
}