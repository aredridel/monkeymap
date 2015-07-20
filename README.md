monkeymap
=========

Perform a map-like operation on any data type.

It handles `Array` &rarr; `Array`, `Object` &rarr; `Object` and scalar &rarr; scalar.

Use
-----

```javascript
var monkeymap = require('monkeymap');

monkeymap([1, 2, 3], function doubler(e, next) {
    next(null, e * 2);
}, function (err, result) {
    // result is [2, 4, 6];
});
```
