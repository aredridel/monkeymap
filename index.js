"use strict";

var async = require('async');

module.exports = function monkeymap(inp, it, cb) {
    if (it.length < 3) {
        it = promote3(it);
    }

    if (inp && (Array.isArray(inp) || typeof inp === 'object')) {
        async.reduce(Object.keys(inp), new inp.constructor(), function (obj, key, next) {
            it(inp[key], key, function (err, val) {
                if (err) {
                    next(err);
                } else {
                    obj[key] = val;
                    next(null, obj);
                }
            });
        }, cb);
    } else {
        async.ensureAsync(it)(inp, null, cb);
    }
};

function promote3(it) {
    return function (a, b, cb) {
        it(a, cb);
    };
}
