(function () {
    "use strict";
    
    var MAX_NUM_BYTE = 256;
    var CANVAS_WIDTH = 300;
    var CANVAS_HEIGHT = 300;
    var canvas, ctx;
    
    function generateImage(width, height) {
        var dataObj = ctx.createImageData(width, height);
        var numPixels = getNumPixels(width, height);
        var pixel, pixelCount, i;
        for (i = 0, pixelCount = 0; pixelCount < numPixels; pixelCount++, i += 4) {
            pixel = generatePixel();
            // copy data from generate pixel to the image data
            dataObj.data[i] = pixel.r;
            dataObj.data[i + 1] = pixel.g;
            dataObj.data[i + 2] = pixel.b;
            dataObj.data[i + 3] = pixel.a;
        }
        return dataObj;
    }
    
    function generatePixel() {
        return {
            r: Math.random() * MAX_NUM_BYTE,
            g: Math.random() * MAX_NUM_BYTE,
            b: Math.random() * MAX_NUM_BYTE,
            a: Math.random() * MAX_NUM_BYTE
        };
    }
    
    function getNumPixels(width, height) {
        // the image data of the canvas is RGBA, each pixel is 4 bytes
        // one byte for each: RGBA (0-255)
        return width * height;
    }
    
    // better idea
    // stick with just generating random images and have it learn
    // what types of images a person likes, or people like
    
    // different types of image generators
    // some with pixels far apart (separation - open space)
    // some with clusters of pixels (density)
    // some completely random (chaos)
    // weight each of these and generate images
    
    function attachButtonHandlers() {
        var generate = document.getElementById("generate");
        generate.onclick = function () {
            ctx.putImageData(generateImage(CANVAS_WIDTH, CANVAS_HEIGHT), 
                                           0, 0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
    }
    
    window.onload = function () {
        var canvasElements = document.getElementsByTagName("canvas");
        
        canvas = canvasElements && canvasElements[0] ? 
                                   canvasElements[0] : null;
        
        // create a canvas element, we will then inject it into the body
        if (!canvas) {
            canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
        }
        
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        ctx = canvas.getContext('2d');
        
        attachButtonHandlers();
    };
}());