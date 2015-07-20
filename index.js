"use strict";

var async = require('async');

module.exports = function monkeymap(inp, it, cb) {
    if (Array.isArray(inp)) {
        async.map(inp, it, cb);
    } else if (inp && typeof inp === 'object') {
        async.reduce(Object.keys(inp), {}, function (obj, key, next) {
            it(inp[key], function (err, val) {
                if (err) {
                    next(err);
                } else {
                    obj[key] = val;
                    next(null, obj);
                }
            });
        }, cb);
    } else {
        async.ensureAsync(it)(inp, cb);
    }
};
