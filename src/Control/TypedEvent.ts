/**
 * @file
 * @brief Typesafe event router for Typescript.
 */

export interface Disposer { (): void; }
export interface Listenner<E, R> { (e: E, dispose: Disposer): R; }
export interface ListennerOnce<E, R> { (e: E): R; }

export class TypedEvent<E, R> {

  private listenners: Listenner<E, R>[] = [];
  private listennerOncer: ListennerOnce<E, R>[] = [];

  subscribe(x: Listenner<E, R>): Disposer {
    this.listenners.push(x);
    return (() => this.unsubscribe(x));
  }

  unsubscribe(x: Listenner<E, R>): void {
    const y = this.listenners.indexOf(x);
    if (y > -1) this.listenners.splice(y, 1)
  }

  once(x: ListennerOnce<E, R>): Disposer {
    this.listennerOncer.push(x);
    return (() => this.remove_once(x));
  }

  remove_once(x: ListennerOnce<E, R>): void {
    const y = this.listennerOncer.indexOf(x);
    if (y > -1) this.listennerOncer.splice(y, 1);
  }

  fire(e: E): R[] {
    const x = this.listennerOncer; this.listennerOncer = [];
    return this.listenners.map(f => f(e, () => this.unsubscribe(f))).concat(x.map(f => f(e)));
  }

  fire_(e: E): void {
    const x = this.listennerOncer; this.listennerOncer = [];
    this.listenners.forEach(f => f(e, () => this.unsubscribe(f)));
    x.forEach(f => f(e));
  }
}


