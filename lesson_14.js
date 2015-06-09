"use strict";
function getType (t) {
    if (isArrayLike(t)){
        return 'Array-like';
    }
    var type = {}.toString.call(t).slice(8, -1);
    return type;
}

//Возвращает true если объект, у которого есть неотрицательное свойство length и элементы с 0 до length - 1.
function isArrayLike (t) {
    //при условии if (t.length) {} при некоторых переменных вылетает ошибка
    //потому пишу тонну исключений :(
    var type = {}.toString.call(t).slice(8, -1);
    if (t === undefined) return false;
    if (t === null) return false;
    if (type === 'Array') return false;
    if (type === 'String') return false;
    if (type === 'Function') return false;
    if (type === 'Number') return false;

    if ((t.length) || (t.length == 0)){
        var length = t.length;
    }
    var counter = 0;
    for (var key in t) {
      counter++;
    }
    if (length == counter){
        return true;
    }
    return false;
}
function returnArguments () {
    return arguments;
}
