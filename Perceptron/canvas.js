(function () {
    "use strict";
    
    var canvas;
    var context;
    
    // dataset should be given as array of points
    // a point is an object of structure { x: X, y: Y }
    function getDataBounds(dataset) {
        var xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE;
        var xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE;
        dataset.forEach(function (point) {
            if (point.x > xMax) {
                xMax = point.x;
            }
            if (point.x < xMin) {
                xMin = point.x;
            }
            if (point.y > yMax) {
                yMax = point.y;
            }
            if (point.y < yMin) {
                yMin = point.y;
            }
        });
        return new (function () {
            this.xMin = Math.floor(xMin);
            this.xMax = Math.ceil(xMax);
            this.yMin = Math.floor(yMin);
            this.yMax = Math.ceil(yMax);
            this.scalarX = Math.floor(canvas.width / (this.xMax - this.xMin));
            this.scalarY = Math.floor(canvas.height / (this.yMax - this.yMin));
        })();
    }
    
    function drawPlane(dataBounds) {
        // draw x-axis
        if (dataBounds.yMax < 0) {
        } else if (dataBounds.yMin > 0) {
        } else {
            context.moveTo(0, dataBounds.yMax * dataBounds.scalarY);
            context.lineTo(canvas.width, dataBounds.yMax * dataBounds.scalarY);
        }
        // draw y-axis
        if (dataBounds.xMax < 0) {
        } else if (dataBounds.xMin > 0) {
        } else {
            context.moveTo(-dataBounds.xMin * dataBounds.scalarX, 0);
            context.lineTo(-dataBounds.xMin * dataBounds.scalarX, canvas.height);
        }
        context.stroke();
    }
    
    // lineInfo object has structure { m: M, b: B}
    function drawLine(lineInfo, dataBounds) {
        context.beginPath();
        context.moveTo(0, 
            (dataBounds.yMax - (dataBounds.xMin * lineInfo.m + lineInfo.b)) * dataBounds.scalarY);
        context.lineTo(canvas.width, 
            (dataBounds.yMax - (dataBounds.xMax * lineInfo.m + lineInfo.b)) * dataBounds.scalarY);
        context.stroke();
    }
    
    function plotDataSet(dataSet, dataBounds) {
        dataSet.forEach(function (point) {
            context.fillRect((point.x - dataBounds.xMin) * dataBounds.scalarX, 
                             (dataBounds.yMax - point.y) * dataBounds.scalarY, 3, 3); 
        });
    }
    
    window.onload = function () {
        canvas = document.getElementsByTagName("canvas")[0];
        context = canvas.getContext('2d');
        
        var targetLine = Random.generateLine(10, 10);
        
        var randomPoints = Random.generatePoints(20, 10, 10);
        randomPoints = randomPoints.map(function (point) {
            point.label = targetLine(point.x) > 0 ? 1 : -1;
            return point;
        });
        
        var dataBounds = getDataBounds(randomPoints);
        
        drawPlane(dataBounds);
        drawLine(targetLine, dataBounds);
        plotDataSet(randomPoints, dataBounds);
        
        var perceptron = new Perceptron();
        var numPoints = randomPoints.length;
        randomPoints.forEach(function (point, i) {
            if (i < numPoints - 1) {
                perceptron.train([point.x, point.y], point.label);    
            }
        });
        
        drawLine({
            m: perceptron.weights[0],
            b: perceptron.bias
        }, dataBounds);
    };
    
}());