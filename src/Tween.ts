/**
 * @file
 * @brief Variouse Tweens for Typescript.
 */

export interface TweenFunction {
  f(t: number): number;
  d: number;
}

export interface TweenListenner {
  onStart(): void;
  onUpdate(t: number, x: number): void;
  onComplete(): void;
}

export class Tween {
  private intervalid: number|null;

  constructor(
    private readonly tweener: TweenFunction,
    private readonly listenner: TweenListenner) {
    this.intervalid= null;
  }

  start(): boolean {
    if (this.intervalid != null) return false;

    this.listenner.onStart();
    const starttime = performance.now();
    this.intervalid = window.requestAnimationFrame(t => {
      const t1 = (t - starttime) / this.tweener.d;
      const t2 = (t1 > 1.0)? 1.0 : t1;

      this.listenner.onUpdate(t2, this.tweener.f(t2));
      if (t1 >= 1.0) {
        if (this.intervalid != null)
          window.cancelAnimationFrame(this.intervalid);
        this.intervalid = null;

        this.listenner.onComplete();
      }
    });
    return true;
  }

  stop(): boolean {
    if (this.intervalid != null) {
      window.cancelAnimationFrame(this.intervalid);
      this.intervalid = null;
      return true;
    }
    return false;
  }
}




export function easeInQuad(s: number, e: number, d: number): TweenFunction {
  return { f: t => t * e * t * t + s, d: d }; }
export function easeOutQuad(s: number, e: number, d: number): TweenFunction {
  return { f: t => -(t * e) * t * (t - 2) + s, d: d }; }
export function easeInOutQuad(s: number, e: number, d: number): TweenFunction {
  return { f: t => (t / 2 < 1) ? (t * e / 2 * t * t + s)
                               : (-(t * e) / 2 * ((--t) * (t - 2) - 1) + s),
           d: d }; }
export function easeInCubic(s: number, e: number, d: number): TweenFunction {
  return { f: t => t * e * t * t * t + s, d: d }; }


