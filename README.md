# Express Instruments

A library that provides middleware functions to measure aspects of the
request/response cycle in express.js app.

## Install

    npm install express-instruments

## Usage

### responseTime

Measures response time which can be accessed on the response object as
`res.responseTime`.


    var express = require('express');
    var instruments = require('express-instruments');

    app = express();

    app.use(instruments.responseTime());

    app.use(function(req, res, next) {
        var handler = function() {
            res.removeListener('finish', handler);
            console.log('response time was:', res.responseTime);
        };
        res.on('finish', handler);
        next():
    });

### stopwatch

Provides a means to measure time intervals during request handling.


    var express = require('express');
    var instruments = require('express-instruments');
    var Product = require('./lib/products/models/Product');

    app = express();

    app.use(instruments.stopwatch());

    app.get(function(req, res) {
        Product.find({type: 'book'}, req.mark('fetch', function(err, res) {
            console.log('printing interval marks:');
            console.log(req.marks);
        });

        // another way to use it
        req.mark('timeout:1');
        setTimeout(function() {
            req.mark('timeout:1');
        }, 2000);

        // and yet another
        var probe = req.mark('timeout:2');
        setTimeout(probe, 2000);
    });

