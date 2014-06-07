'use strict';

module.exports = function() {
    return function(req, res, next) {
        var start = process.hrtime();
        var handler = function() {
            var diff = process.hrtime(start);
            var elapsed = diff[0] * 1e9 + diff[1];
            res.removeListener('finish', handler);
            res.removeListener('close', handler);
            res.responseTime = elapsed;
        };
        res.on('close', handler);
        res.on('finish', handler);
        next();
    };
};
