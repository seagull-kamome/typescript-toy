/**
 * @file
 * @brief Either data wrapper for TypeScript.
 *
 * Copyright(C) 2020, HATTORI, Hiroki
 * All rights reserved.
 */

import { Tagged_, Tagged } from './Tagged';
import { Lazy } from './Lazy';

/* ************************************************************************ */

interface IEither<L, R> {
  isLeft(): boolean;
  isRight(): boolean;

  fromRight(r: R): R;
  fromRight_(r: Lazy<R>): Lazy<R>;

  fromLeft(l: L): L;
  fromLeft_(l: Lazy<L>): Lazy<L>;

  either<A>(f: (l:L) => A, g: (r:R) => A): A;
}


class CLeft<L, R> implements Tagged<'Left',L>, IEither<L, R> {
  readonly __tag: 'Left' = 'Left';
  constructor(public readonly __v: L) {}

  isRight(): boolean { return false; }
  isLeft(): boolean { return true; }

  fromRight(r: R): R { return r; }
  fromRight_(r: Lazy<R>): Lazy<R> { return r; }

  fromLeft(l: L): L { return this.__v; }
  fromLeft_(l: Lazy<L>): Lazy<L> { return () => this.__v; }

  either<A>(f: (l:L) => A, g: (r:R) => A): A { return f(this.__v); }
}


class CRight<L, R> implements Tagged<'Right', R>, IEither<L, R> {
  readonly __tag: 'Right' = 'Right';
  constructor(public readonly __v: R) {}

  isRight(): boolean { return false; }
  isLeft(): boolean { return true; }

  fromRight(r: R): R { return this.__v; }
  fromRight_(r: Lazy<R>): Lazy<R> { return () => this.__v; }

  fromLeft(l: L): L { return l; }
  fromLeft_(l: Lazy<L>): Lazy<L> { return l; }

  either<A>(f: (l:L) => A, g: (r:R) => A): A { return g(this.__v); }
}



export type Either<L, R> = CLeft<L, R> | CRight<L, R>;
export function Left<L, R>(l:L): Either<L, R> { return new CLeft(l); }
export function Right<L, R>(r:R): Either<L, R> { return new CRight(r); }



// vim: sw=2 ts=8 noexpandtab
