"use strict";
function count (obj) {
   var j = 0;
    for(var i in obj) {
        j++;
    }
    return j;
}
