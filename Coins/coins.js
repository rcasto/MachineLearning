(function () {
    "use strict";
    
    function Coin(probHeads) {
        this.probHeads = probHeads || 0.5;
    }
    // returns true for heads, false for tails
    Coin.prototype.roll = function () {
        return Math.random() < this.probHeads;
    };
    Coin.prototype.test = function (numRolls) {
        var numHeads = 0, i;
        for (i = 0; i < numRolls; i++) {
            if (this.roll()) {
                numHeads++;
            }
        }
        return (numHeads / numRolls) * 100;
    };
    Coin.prototype.toString = function (numRolls) {
        numRolls = numRolls || 1000000;
        console.log("Probability Heads: " + this.probHeads);
        console.log("Tested Probability Heads: " + this.test(numRolls));
    };
    
    function CoinSet(numCoins) {
        this.numCoins = numCoins;
        this.coins = [];
    }
    CoinSet.prototype.roll = function () {
    };
    
    window.onload = function () {
        var coin = new Coin();
        var coin2 = new Coin(0.7);
        coin.toString();
        coin2.toString();
    };
    
}());