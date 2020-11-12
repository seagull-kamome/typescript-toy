"use strict";
/**
 * @file
 * @brief Variouse Tweens for Typescript.
 */
exports.__esModule = true;
exports.easeInCubic = exports.easeInOutQuad = exports.easeOutQuad = exports.easeInQuad = exports.Tween = void 0;
var Tween = /** @class */ (function () {
    function Tween(tweener, onStart, onUpdate, onComplete) {
        this.tweener = tweener;
        this.onStart = onStart;
        this.onUpdate = onUpdate;
        this.onComplete = onComplete;
        this.intervalid = null;
    }
    Tween.prototype.start = function () {
        var _this = this;
        if (this.intervalid != null)
            return false;
        this.onStart();
        var starttime = performance.now();
        this.intervalid = window.requestAnimationFrame(function (t) {
            var t1 = (t - starttime) / _this.tweener.d;
            var t2 = (t1 > 1.0) ? 1.0 : t1;
            _this.onUpdate(t2, _this.tweener.f(t2));
            if (t1 >= 1.0) {
                window.cancelAnimationFrame(_this.intervalid);
                _this.intervalid = null;
                _this.onComplete();
            }
        });
    };
    Tween.prototype.stop = function () {
        if (this.intervalid != null) {
            window.cancelAnimationFrame(this.intervalid);
            this.intervalid = null;
            return true;
        }
        return false;
    };
    return Tween;
}());
exports.Tween = Tween;
function easeInQuad(s, e, d) {
    return { f: function (t) { return t * e * t * t + s; }, d: d };
}
exports.easeInQuad = easeInQuad;
function easeOutQuad(s, e, d) {
    return { f: function (t) { return -(t * e) * t * (t - 2) + s; }, d: d };
}
exports.easeOutQuad = easeOutQuad;
function easeInOutQuad(s, e, d) {
    return { f: function (t) { return (t / 2 < 1) ? (t * e / 2 * t * t + s)
            : (-(t * e) / 2 * ((--t) * (t - 2) - 1) + s); }, d: d };
}
exports.easeInOutQuad = easeInOutQuad;
function easeInCubic(s, e, d) {
    return { f: function (t) { return t * e * t * t * t + s; }, d: d };
}
exports.easeInCubic = easeInCubic;
