/**
 * @file
 * @brief Reader/Writer/State
 *
 * This is useless. Just experimental.
 */



/* ************************************************************************ */
// Reader

export class Reader<E, R> {
  constructor(readonly runReader: (e: E) => R) { };

  // Functor
  map<S>(f: ((r: R) => S)): Reader<E, S> {
    return new Reader<E, S>(e => f(this.runReader(e))); }

  // Point
  static pure<E, R>(x: R): Reader<E, R> { return new Reader<E, R>(e => x); }

  // Applicative
  r_ap<S>(fa: Reader<E, ((r: R) => S)>): Reader<E, S> {
    return new Reader(e => fa.runReader(e)(this.runReader(e)));
  }

  // ap<S, T>(x: Reader<E, S>): (R extends ((s:S) => T)? Reader<E, T> : never) {
  //   return new Reader(e => this.runReader(e)(x.runReader(e)));
  // }

  // Monad
  bind<A>(rhs: ((r:R) => Reader<E, A>)): Reader<E, A> {
    return new Reader(e => rhs(this.runReader(e)).runReader(e));
  }
}

export function reader<E, R>(fa: (e:E) => R) { return new Reader<E, R>(fa); }



/* ************************************************************************ */
// Writer



