'use strict';

module.exports = function() {
    return function(req, res, next) {
        var probes = {};
        req.marks = [];

        req.mark = function(name, callback) {
            var probe = probes[name];
            var start  = process.hrtime();
            name = name || '';

            if (probe) {
                req.marks.push([name, probe()]);
                delete probes[name];
            }
            else {
                probes[name] = function() { return process.hrtime(start); };
            }

            return function() {
                req.mark(name);
                if (typeof callback === 'function') {
                    callback.apply(this, arguments);
                }
            };
        };
        next();
    };
};

