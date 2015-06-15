"use strict";
function EGrid() {
}
//Наследование
EGrid.prototype = Object.create(Array.prototype);
EGrid.prototype.constructor = EGrid;
//Методы
EGrid.prototype.getEnergy = function(timeOfDay){
    timeOfDay = timeOfDay || 'day';
    var energy = 0;
    for (var i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) {
            continue;
        }
        if (this[i] instanceof PowerLine) {
            continue;
        }
        energy += this[i].getPower(timeOfDay);
    }
    return energy;
};
EGrid.prototype.calculateEnergy = function(timeOfDay){
    timeOfDay = timeOfDay || 'day';
    var power = this.getEnergy(timeOfDay);
    if (power > 0) {
        return this.tradeEnergy(power, 'sell');
    } else if (power < 0) {
        return this.tradeEnergy(power, 'buy');
    } else {
       return {message: 'н/д', tradePower: 0, money: 0};
    }
};
//trade принимает значения 'buy' или 'sell'
EGrid.prototype.tradeEnergy = function(power, trade){
    var money = 0;
    var tradePower = 0;
    var minPower;
    var message;
    if (trade ==  'sell') {
        message = 'продано';
    } else if (trade ==  'buy')  {
        message = 'закуплено';
    } else {
        throw new Error("Значение trade должно быть равно sell или buy");
    }

    var arr = this.getPowerLinesTrade(trade);

    var p = Math.abs(power);
    for (var i = 0; i < arr.length; ++i) {   
        if (p > 0){
            minPower = Math.min(Math.abs(arr[i].getPower()), Math.abs(p));
            money += Math.abs(arr[i].getPrice() * minPower);   
            tradePower += Math.abs(minPower);
            p -= Math.abs(minPower);
        } else {
            break;
        } 
    }

    return {message: message, tradePower: tradePower, money: money};
};
EGrid.prototype.getPowerLinesTrade = function(trade){
    var arr = [];
    for (var i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) {
            continue;
        }
        if (!(this[i] instanceof PowerLine)) {
            continue;
        }
        if (((trade ==  'sell') && ( this[i].getPower() < 0 )) || ((trade ==  'buy') && ( this[i].getPower() > 0 ))){
            arr.push(this[i]);
        }
    }

    if (trade ==  'sell') {
        arr.sort( function (a, b) {
            return b.getPrice() - a.getPrice();
        });
    } else if (trade ==  'buy') {
        arr.sort( function (a, b) {
            return a.getPrice() - b.getPrice();
        });
    } else {
        throw new Error("Значение trade должно быть равно sell или buy");
    }
    return arr;
};


function ElementGrid(power){
    this.setPower(power);
}
ElementGrid.prototype.setPower = function(power){
    this._power = power;
};
ElementGrid.prototype.getPower = function(){
    return this._power;
};

function Powerhouse(power) {
    ElementGrid.call(this, power);
}
//Наследование
Powerhouse.prototype = Object.create(ElementGrid.prototype);
Powerhouse.prototype.constructor = Powerhouse;
//Методы
Powerhouse.prototype.setPower = function(power){
    if (( power >= 1 ) && ( power <= 100 )){
        ElementGrid.prototype.setPower.call(this, power);
    } else {
        throw new Error("Станция должна вырабатывать от 1 до 100 мегаватт");
    }
};

//Конструктор
function SolarPanel(power) {
    ElementGrid.call(this, power);
}
//Наследование
SolarPanel.prototype = Object.create(ElementGrid.prototype);
SolarPanel.prototype.constructor = SolarPanel;
//Методы
SolarPanel.prototype.setPower = function(power){
    if (( power >= 1 ) && ( power <= 5 )){
        ElementGrid.prototype.setPower.call(this, power);
    } else {
        throw new Error("Солнечная панель должна вырабатывать от 1 и до 5 мегаватт днем");
    }
};
SolarPanel.prototype.getPower = function(timeOfDay){
    timeOfDay = timeOfDay || 'day';
    if (timeOfDay == 'day'){
        return this._power;
    } else if (timeOfDay == 'night') {
        return 0;
    } else {
        throw new Error("Время суток день - day или ночь - night");
    }
};


function House(apartments) {
    this.setApartments(apartments);
}
//Наследование
House.prototype = Object.create(ElementGrid.prototype);
House.prototype.constructor = House;
//Методы
House.prototype.setApartments = function(apartments){
    if (( apartments >= 1 ) && ( apartments <= 400 )){
        this._apartments = apartments;
    } else {
        throw new Error("В доме должно находится от 1 до 400 квартир");
    }
};
House.prototype.getPower = function(timeOfDay){
    timeOfDay = timeOfDay || 'day';
    if (timeOfDay == 'day'){
        return this._apartments * -4;
    } else if (timeOfDay == 'night') {
        return this._apartments * -1;
    } else{
        throw new Error("Время суток день - day или ночь - night");
    }
};

function PowerLine(power, price) {
    ElementGrid.prototype.setPower.call(this, power);
    this.setPrice(price);
}
PowerLine.prototype.setPrice = function(price){
    this._price = price;
};
PowerLine.prototype.getPower = function(){
    return this._power;
};
PowerLine.prototype.getPrice = function(){
    return this._price;
};

function addElement(obj, functionConstructor, arr) {   
    for (var i = 0; i < arr.length; i++) {
        var element
        if (arr[i] instanceof Object) {
            element = new functionConstructor(arr[i].power, arr[i].price);   
        } else {
            element = new functionConstructor(arr[i]);   
        } 
        obj.push(element);
    }
}