/**
 * @file
 * @brief Variouse Tweens for Typescript.
 */

export interface EasingFunction { (t: number): number; }

export interface TweenListenner {
  onStart(): void;
  onUpdate(t: number, x: number): void;
  onComplete?(): void;
}

export class Tween {
  private intervalid: number|null;

  constructor(
    private readonly easing: EasingFunction,
    private readonly dulation: number,
    private readonly repeat: boolean,
    private readonly listenner: TweenListenner) {
    this.intervalid= null;
  }

  start(): boolean {
    if (this.intervalid != null) return false;

    this.listenner.onStart();
    const starttime = performance.now();
    this.intervalid = window.requestAnimationFrame(t => {
      const t1 = t - starttime;
      if (this.repeat || t < this.duration) {
        this.listenner.onUpdate(this.easing(t1 % this.duration / this.duration));
      } else if (t >= this.duration) {
        this.listenner.onUpdate(this.easing(1.0));
        if (this.intervalid != null) {
          window.cancelAnimationFrame(this.intervalid);
          this.intervalid = null;
        }

        if (this.listenner.onComplete != null)
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

export const easeLinear: EasingFunction = t => t;

export const easeInQuad: EasingFunction = t => t * t;
export const easeOutQuad: EasingFunction = t => t * (2 - t);
export const easeInOutQuad: EasingFunction = t =>
  ((t *= 2) < 1)? (0.5 * t * t) : (0.5 * (-t * (t - 2) -1) );

export const easeInCubic: EasingFunction = t => t * t * t;
export const easeOutCubic: EasingFunction = t => --t * t * t + 1;
export const easeInOutCubic: EasingFunction = t =>
  ((t *= 2) < 1)? (0.5 * t * t * t) : (0.5 * (t - 2) * t * t - 2);

export const easeInSinusodial: EasingFunction = t => 1 - Math.cos((t * Math.PI) / 2);
export const easeOutSinusodial: EasingFunction = t => Math.sin((t * Math.PI) / 2);
export const easeInOutSinusodial: EasingFunction = t => 0.5 * (1 - Math.cos(Math.PI * t));

export const easeInExponential: EasingFunction = t => (t == 0)? 0 : Math.pow(1024, t - 1);
export const easeOutExponential: EasingFunction = t => (t == 1)? 1 : 1 - Math.pow(2, -10 * t);
export const easeInOutExponential: EasingFunction = t =>
  (t == 0)? 0
    : (t == 1)? 1
    : ((t *= 2) < 1)? (0.5 * Math.pow(1024, t - 1))
    : (0.5 * (-Math.pow(2, -10 * (t - 1)) + 2));

export const easeInCircular: EasingFunction = t => 1 - Math.sqrt(1 - t * t);
export const easeOutCircular: EasingFunction = t => Math.sqrt(1 - --t * t);
export const easeInOutCircular: EasingFunction = t =>
  ((t *= 2) < 1)? (-0.5 * (Math.sqrt(1 - t * t) - 1))
    : (0.5 * Math.sqrt(1 - (t -= 2) * t) + 1);




