"use strict";
function ElectricGrid(powerhouses, solarPanels, houses, powerLines) {
    this.setElectricGrid(powerhouses, solarPanels, houses, powerLines);
}
ElectricGrid.prototype.setElectricGrid = function(powerhouses, solarPanels, houses, powerLines){
    this.powerhouses = powerhouses;
    this.solarPanels = solarPanels;
    this.houses = houses;
    this.powerLines = powerLines;
}
ElectricGrid.prototype.getFreeEnergyDay = function(){
    var energy = 0;
    for (var key in this.powerhouses) {
        energy += powerhouses[key].getPower();
    }
    for (var key in this.solarPanels) {
        energy += solarPanels[key].getPower();
    }
    for (var key in this.houses) {
        energy -= houses[key].getApartments() * 4;
    }
    return energy;
}
ElectricGrid.prototype.getFreeEnergyNight = function(){
    var energy = 0;
    for (var key in this.powerhouses) {
        energy += powerhouses[key].getPower();
    }
    for (var key in this.houses) {
        energy -= houses[key].getApartments() * 1;
    }
    return energy;
}
ElectricGrid.prototype.sellFreeEnergyNight = function(){
    var freePower = this.getFreeEnergyNight();
    var money = this.powerLines.sellPower(freePower);
}

function Generator(power){
    this.setPower(power);
}
Generator.prototype.setPower = function(power){
    this._power = power;
}
Generator.prototype.getPower = function(power){
    return this._power;
}

function Powerhouse(power) {
    this.setPower(power);
}
//Наследование
Powerhouse.prototype = Object.create(Generator.prototype);
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
SolarPanel.prototype = Object.create(Generator.prototype);
SolarPanel.prototype.constructor = SolarPanel;
//Методы
SolarPanel.prototype.setPower = function(power){
    if (( power >= 1 ) && ( power <= 5 )){
        this._power = power;
    } else {
        throw new Error("Солнечная панель должна вырабатывать от 1 и до 5 мегаватт днем");
    }
}


function House(apartments) {
    this.setApartments(apartments);
}
House.prototype.setApartments = function(apartments){
    if (( apartments >= 1 ) && ( apartments <= 400 )){
        this._apartments = apartments;
    } else {
        throw new Error("В доме должно находится от 1 до 400 квартир");
    }
}
House.prototype.getApartments = function(apartments){
    return this._apartments;
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

function SolarPanels() {
    for (var i = 0; i < arguments.length; i++) {
        var solarPanels = new SolarPanel(arguments[i]);
        this[i] = solarPanels;
    }
}
function Houses() {
    for (var i = 0; i < arguments.length; i++) {
        var house = new House(arguments[i]);
        this[i] = house;
    }
}
function Powerhouses() {
    for (var i = 0; i < arguments.length; i++) {
        var powerhouse = new Powerhouse(arguments[i]);
        this[i] = powerhouse;
    }
}
function PowerLines() {
    for (var i = 0; i < arguments.length; i++) {
        var powerLine = new PowerLine(arguments[i].power, arguments[i].price);
        this[i] = powerLine;
    }
}

PowerLines.prototype.sellPower = function(power){
    var arr = [];
    var money = 0;
    var sellPower = 0;
    for (var key in this) {
        console.log( this[key].getPower() );
        //линия с отрицательной мощностью купит энергию. Остальные нас не интересуют
        if ( this[key].getPower() < 0 ) {
            arr[key] = this[key];
        }
    }

    arr.sort(sortBigPrice);

    for (var key in arr) {
        if (arr[key].getPower() < power) {
            money += arr[key].getPrice() * arr[key].getPower();
            sellPower += arr[key].getPower();
            power -= arr[key].getPower();
        } else {
            money += arr[key].getPrice() * power;
            sellPower += power;
            power = 0;
            break;
        }
    }
    alert('Можно продать '+sellPower+' энергии. В результате получим '+money+' денег');

}

function sortBigPrice(a, b) {
    return b.getPrice() - a.getPrice();
}
function sortSmallPrice(a, b) {
    return a.getPrice() - b.getPrice();
}