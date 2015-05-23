"use strict";
function Humburger(burgerSize, burgerStuffing, spice = false, mayonnaise = false) {

    this.setSize = function(burgerSize){
        if (burgerSize == 'SMAL'){
            this.burgerSize = SMAL;
        } else if (burgerSize == 'LARGE'){
            this.burgerSize = LARGE;
        } else {
            throw new Error("Размер бургера должен быть 'SMAL' или 'LARGE'");
        }
    }
    this.setStuffing = function(burgerStuffing){
        this.burgerStuffing = burgerStuffing;
        if (burgerStuffing == 'CHEESE'){
            this.burgerStuffing = CHEESE;
        } else if (burgerStuffing == 'SALAD'){
            this.burgerStuffing = SALAD;
        } else if (burgerStuffing == 'POTATOES'){
            this.burgerStuffing = POTATOES;
        }else {
            throw new Error("Начинка бургера должен быть 'CHEESE', 'SALAD' или 'POTATOES'");
        }
    }

    this.setSpice = function(spice){
        if (typeof(spice) !== "boolean"){
            throw new Error("Значение специй должно быть boolean");
        }
        if (spice){
            this.burgerSpice = SPICE;
        } else {
            this.burgerSpice = {price: 0, calories: 0};
        }
    }
    this.setMayonnaise = function(mayonnaise){
        if (typeof(mayonnaise) !== "boolean"){
            throw new Error("Значение майонеза должно быть boolean");
        }
        if (mayonnaise){
            this.burgerMayonnaise = MAYONNAISE;
        } else {
            this.burgerMayonnaise = {price: 0, calories: 0};
        }
    }

    this.getCalories = function() {
        var calories = 0;
        calories += this.burgerSize.calories;
        calories += this.burgerStuffing.calories;
        calories += this.burgerSpice.calories;
        calories += this.burgerMayonnaise.calories;
        return calories;
    }

    this.getPrice = function(){
        var price = 0;
        price += this.burgerSize.price;
        price += this.burgerStuffing.price;
        price += this.burgerSpice.price;
        price += this.burgerMayonnaise.price;
        return price;
    }

    this.setSize(burgerSize);
    this.setStuffing(burgerStuffing);
    this.setSpice(spice);
    this.setMayonnaise(mayonnaise);
}


