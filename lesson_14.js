"use strict";
var MAX_SAFE_INTEGER = 9007199254740991;

function getType (t) {
    var type = {}.toString.call(t).slice(8, -1);

    if ((type == 'String') || (type == 'Array') || (type == 'Function')){
        return type;
    }
    if (isArrayLike(t)){
        return 'Array-like';
    }
    return type;
}

function returnArguments () {
    return arguments;
}

function isArrayLike(value) {
    return value !== null && !(value === undefined) && isLength(getLength(value));
}
function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

function getLength(object) {
    return object === null ? undefined : object.length;
}
