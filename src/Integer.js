"use strict";
/**
 * @file
 * @bried Implementation of Integer.
 */
exports.__esModule = true;
exports.Integer = void 0;
/** Pre-checked integral number.
 */
var Integer = /** @class */ (function () {
    function Integer(x) {
        this.value = x;
    }
    Integer.floor = function (x) { return new Integer(Math.floor(x)); };
    Integer.ceil = function (x) { return new Integer(Math.ceil(x)); };
    Integer.round = function (x) { return new Integer(Math.round(x)); };
    Integer.unsafeFromNumber = function (x) { return new Integer(x); };
    return Integer;
}());
exports.Integer = Integer;
/*
 * const x = Integer.floor(2.1);
 * // const y = new Integer(3.5);       <-- error
 *
 * function foo(): void {
 *   var z = Integer.floor(5.5);
 *   // z.value = 2;                    <-- error
 * }
 */
