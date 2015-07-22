"use strict";
var monkeymap = require('./');

var test = require('tap').test;

test('monkeymapping an Array', function (t) {
    t.plan(3);
    monkeymap([1, 2, 3], double, function (err, arr) {
        t.error(err);
        t.ok(Array.isArray(arr));
        t.deepEqual(arr, [2, 4, 6]);
        t.end();
    });
});

test('monkeymapping an Object', function (t) {
    t.plan(2);
    monkeymap({ a: 1, b: 2, c: 3}, double, function (err, obj) {
        t.error(err);
        t.deepEqual(obj, {a: 2, b: 4, c: 6});
        t.end();
    });
});

test('monkeymapping an Object with a key', function (t) {
    t.plan(2);
    monkeymap({ a: 1, b: 2, c: 3}, mergekey, function (err, obj) {
        t.error(err);
        t.deepEqual(obj, {a: "val = 1 key = a", b: "val = 2 key = b", c: "val = 3 key = c"});
        t.end();
    });
});

test('monkeymapping a scalar value', function (t) {
    t.plan(2);
    monkeymap(5, double, function (err, num) {
        t.error(err);
        t.equal(num, 10);
        t.end();
    });
});

test('monkeymapping an undefined value', function (t) {
    t.plan(3);
    monkeymap(void 0, double, function (err, num) {
        t.error(err);
        t.ok(typeof num === 'number');
        t.equal(num.toString(), 'NaN');
        t.end();
    });
});

function double(val, next) {
    next(null, val * 2);
}

function mergekey(val, key, next) {
    next(null, 'val = ' + val + ' key = ' + key);
}
