"use strict";
function EGrid() {
}
//Наследование
EGrid.prototype = Object.create(Array.prototype);
EGrid.prototype.constructor = EGrid;
//Методы
EGrid.prototype.addElement = function(obj){   
    this.push(obj);
}
EGrid.prototype.addHouse = function() {
    for (var i = 0; i < arguments.length; i++) {
        var house = new House(arguments[i]);
        this.addElement(house);
    }
}
EGrid.prototype.addSolarPanel = function() {
    for (var i = 0; i < arguments.length; i++) {
        var solarPanel = new SolarPanel(arguments[i]);
        this.addElement(solarPanel);
    }
}
EGrid.prototype.addPowerhouse = function() {
    for (var i = 0; i < arguments.length; i++) {
        var powerhouse = new Powerhouse(arguments[i]);
        this.addElement(powerhouse);
    }
}
EGrid.prototype.addPowerLine = function () {
    for (var i = 0; i < arguments.length; i++) {
        var powerLine = new PowerLine(arguments[i].power, arguments[i].price);
        this.addElement(powerLine);
    }
}
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
        return this.sellEnergy(power);
    } else if (power < 0) {
        return this.buyEnergy(power);
    } else {
       return {energy: 0, money: 0, message: "производимая мощность равна расходуемой."};
    }
}
EGrid.prototype.sellEnergy = function(power){
    var arr = [];
    var money = 0;
    var sellPower = 0;
    for (var i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) continue;
        if (!(this[i] instanceof PowerLine)) continue;
        //линия с отрицательной мощностью купит энергию. Остальные нас не интересуют
        if ( this[i].getPower() < 0 ) {
            arr[i] = this[i];
        }
    }

    arr.sort(sortBigPrice);

    for (var key in arr) {
        if (-(arr[key].getPower()) < power) {
            money += arr[key].getPrice() * -(arr[key].getPower());
            sellPower += -(arr[key].getPower());
            power -= -(arr[key].getPower());
        } else {
            money += arr[key].getPrice() * power;
            sellPower += power;
            power = 0;
            break;
        }
    }
    return {energy: sellPower, 
        money: money, 
        message: 'продано '+sellPower+' энергии.'+' В получено '+money+' денег'};
}
EGrid.prototype.buyEnergy = function(power){
    var arr = [];
    var money = 0;
    var buyPower = 0;
    for (var i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) continue;
        if (!(this[i] instanceof PowerLine)) continue;
        //линия с положительной мощностью купит энергию. Остальные нас не интересуют
        if ( this[i].getPower() > 0 ) {
            arr[i] = this[i];
        }
    }

    arr.sort(sortSmallPrice);

    for (var key in arr) {
        if (arr[key].getPower() < -(power)) {
            money += arr[key].getPrice() * arr[key].getPower();
            buyPower += arr[key].getPower();
            power = arr[key].getPower();
        } else {
            money += arr[key].getPrice() * -(power);
            buyPower += -(power);
            power = 0;
            break;
        }
    }
    return {energy: buyPower, money: money, 
        message: 'закуплено '+buyPower+' энергии.'+ 
        ' В потрачено '+money+' денег'};
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
    this.setPower(power);
}
//Наследование
Powerhouse.prototype = Object.create(ElementGrid.prototype);
Powerhouse.prototype.constructor = Powerhouse;
//Методы
Powerhouse.prototype.setPower = function(power){
    if (( power >= 1 ) && ( power <= 100 )){
        this._power = power;
    } else {
        throw new Error("Станция должна вырабатывать от 1 до 100 мегаватт");
    }
}

//Конструктор
function SolarPanel(power) {
    this.setPower(power);
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

function PowerLine(power, price) {
    this.setPowerLine(power, price);
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

function sortBigPrice(a, b) {
    return b.getPrice() - a.getPrice();
}
function sortSmallPrice(a, b) {
    return a.getPrice() - b.getPrice();
}