var Random = (function () {
    "use strict";
    
    function generateSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    
    function generateNumber(min, max) {
        return (Math.random() * (max + 1) + min) * generateSign();
    }
    
    function generatePoint(xMax, yMax) {
        return {
            x: (xMax + 1) * Math.random() * generateSign(),
            y: (yMax + 1) * Math.random() * generateSign()
        };
    }
    
    function generatePoints(numPoints, xMax, yMax) {
        var points = [];
        while (numPoints > 0) {
            points.push(generatePoint(xMax, yMax));
            numPoints--;
        }
        return points;
    }
    
    // line should be function of form (x) => y;
    function generatePointsFromLine(line, xMin, xMax, numPoints) {
        var points = [], num;
        while (numPoints > 0) {
            num = generateNumber(xMin, xMax);
            points.push({
                x: num,
                y: line(num)
            });
            numPoints--;
        }
        return points;
    }
    
    function generateLine(xMax, yMax) {
        var p1 = generatePoint(xMax, yMax);
        var p2 = generatePoint(xMax, yMax);
        var m = (p1.y - p2.y) / (p1.x - p2.x);
        var b = p1.y - m * p1.x;
        function line(x) {
            return m * x + b;
        }
        line.m = m;
        line.b = b;
        return line;
    }
    
    return {
        generateSign: generateSign,
        generateNumber: generateNumber,
        generatePoint: generatePoint,
        generatePointsFromLine:generatePointsFromLine,
        generatePoints: generatePoints,
        generateLine: generateLine
    };
    
}());