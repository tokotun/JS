"use strict";
function EGrid() {
}
//Наследование
EGrid.prototype = Object.create(Array.prototype);
EGrid.prototype.constructor = EGrid;
//Методы
EGrid.prototype.getEnergy = function(timeOfDay = 'day'){
    timeOfDay = timeOfDay || 'day';
    var energy = 0;
    for (var i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) continue;
        if (this[i] instanceof PowerLine) continue;
        energy += this[i].getPower(timeOfDay);
    }
    return energy;
}
EGrid.prototype.calculateEnergy = function(timeOfDay = 'day'){
    timeOfDay = timeOfDay || 'day';
    var power = this.getEnergy(timeOfDay);
    if (power > 0) {
        return this.tradeEnergy(power, 'sell');
    } else if (power < 0) {
        return this.tradeEnergy(power, 'buy');
    } else {
       return "производимая мощность равна расходуемой.";
    }
}
//trade принимает значения 'buy' или 'sell'
EGrid.prototype.tradeEnergy = function(power, trade){
    var arr = [];
    var money = 0;
    var power = Math.abs(power);
    var tradePower = 0;
    var message;
    var minPower;
    for (var i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) continue;
        if (!(this[i] instanceof PowerLine)) continue;
        if (((trade ==  'sell') && ( this[i].getPower() < 0 )) || ((trade ==  'buy') && ( this[i].getPower() > 0 ))){
            arr.push(this[i]);
        }

    }

    if (trade ==  'sell') arr.sort(
            function (a, b) {
                return b.getPrice() - a.getPrice();
            });
    if (trade ==  'buy') arr.sort(
            function (a, b) {
                return a.getPrice() - b.getPrice();
            });


    for (var i = 0; i < arr.length; ++i) {
        if (power > 0){
            minPower = Math.min(Math.abs(arr[i].getPower()), Math.abs(power));
            money += Math.abs(arr[i].getPrice() * minPower);
            tradePower += Math.abs(minPower);
            power = -Math.abs(minPower);
        } else {
            break;
        }
    }

    if (trade ==  'sell') message = 'продано '+tradePower+' энергии. Получено '+money+' денег.';
    if (trade ==  'buy')  message = 'закуплено '+tradePower+' энергии. Потрачено '+money+' денег.';
    return message;
}

function ElementGrid(power){
    this.setPower(power);
}
ElementGrid.prototype.setPower = function(power){
    this._power = power;
}
ElementGrid.prototype.getPower = function(){
    return this._power;
}

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
}

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
        this._power = power;
    } else {
        throw new Error("Солнечная панель должна вырабатывать от 1 и до 5 мегаватт днем");
    }
}
SolarPanel.prototype.getPower = function(timeOfDay = 'day'){
    timeOfDay = timeOfDay || 'day';
    if (timeOfDay == 'day'){
        return this._power;
    } else if (timeOfDay == 'night') {
        return 0;
    } else {
        throw new Error("Время суток день - day или ночь - night");
    }
}


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
}
House.prototype.getPower = function(timeOfDay='day'){
    timeOfDay = timeOfDay || 'day';
    if (timeOfDay == 'day'){
        return this._apartments * -4;
    } else if (timeOfDay == 'night') {
        return this._apartments * -1;
    } else{
        throw new Error("Время суток день - day или ночь - night");
    }
}

function PowerLine(obj) {
    this.setPowerLine(obj.power, obj.price);
}
PowerLine.prototype.setPowerLine = function(power, price){
    this._power = power;
    this._price = price;
}
PowerLine.prototype.getPower = function(){
    return this._power;
}
PowerLine.prototype.getPrice = function(){
    return this._price;
}

function addElement(obj, className, arr) {   
    for (var i = 0; i < arr.length; i++) {
        //не нагуглил  фабрику для разных обьектов :( 
        switch (className){
            case 'Powerhouse':
                var element = new Powerhouse(arr[i]);
                break;
            case 'House':
                var element = new House(arr[i]);
                break;
            case 'SolarPanel':
                var element = new SolarPanel(arr[i]);
                break;
            case 'PowerLine':
                var element = new PowerLine(arr[i]);
                break; 
            default:
                throw new Error("Нет такого класса.");
        }
        obj.push(element);
    }
}