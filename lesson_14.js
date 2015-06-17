"use strict";
var MAX_SAFE_INTEGER = 9007199254740991;

function getType (t) {
    //возвращает строку с типом. Пример :   "[object Number]"
    var type = {}.toString.call(t);
    //Из строки "[object Number]" вырежет "Number"
    type = type.slice(8, -1);
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
    return value !== null && value !== undefined && isLength(getLength(value));
}
//Эту функцию я скопипастил из lodash.
function isLength(value) {
    //value % 1 === 0 - остаток от деления должен быть равен 0.
    //Не может значение длины быть не целым числом. 
    //value <= MAX_SAFE_INTEGER; число не должно быть безобразно большим. Защита от ошибки.
    return typeof value == 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

function getLength(object) {
    return object === null ? undefined : object.length;
}
