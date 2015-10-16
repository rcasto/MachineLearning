(function () {
    "use strict";
    
    function generatePoint(xMax, yMax) {
        return {
            x: xMax * Math.random() + 0.0001,
            y: yMax * Math.random() + 0.0001
        };
    }
    
    function generateLine() {
        var p1 = generatePoint(10, 10);
        var p2 = generatePoint(10, 10);
        var m = (p1.y - p2.y) / (p1.x - p2.x);
        return {
            m: m,
            b: p1.y - m * p1.x
        };
    }
    
    console.log(generateLine());
}());