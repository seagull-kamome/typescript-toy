/**
 * @file
 * @brief Maybe/Optional data wrapper for TypeScript.
 *
 * Copyright(C) 2020, HATTORI, Hiroki
 * All rights reserved.
 */

import { Tagged_, Tagged } from './Tagged';
import { Lazy } from './Lazy';

/* ************************************************************************ */

interface IMaybe<T> {
  isNothing(): boolean;
  isJust(): boolean;

  fromMaybe(x:T): T;
  fromMaybe_(x:Lazy<T>): Lazy<T>;

  maybe<A>(f: (x:T) => A, x:A): A;
  maybe_<A>(f: (x:T) => A, g: Lazy<A>): Lazy<A>;
}


class CNothing<T> implements Tagged_<'Nothing'>, IMaybe<T> {
  readonly __tag: 'Nothing' = 'Nothing';
  constructor() {}

  isNothing(): boolean { return true; }
  isJust(): boolean { return false; }

  fromMaybe(x: T): T { return x; }
  fromMaybe_(x:Lazy<T>): Lazy<T> { return x; }

  maybe<A>(f: (x:T) => A, x:A): A { return x; }
  maybe_<A>(f: (x:T) => A, g:Lazy<A>): Lazy<A> { return g; }
}


class CJust<T> implements Tagged<'Just', T>, IMaybe<T> {
  readonly __tag: 'Just' = 'Just';
  constructor(public readonly __v: T) {}

  isNothing(): boolean { return false; }
  isJust(): boolean { return true; }

  fromMaybe(x: T): T { return this.__v; }
  fromMaybe_(x:Lazy<T>): Lazy<T> { return () => this.__v; }

  maybe<A>(f: (x:T) => A, x: A): A { return f(this.__v); }
  maybe_<A>(f: (x:T) => A, g: Lazy<A>): Lazy<A> { return () => f(this.__v); }
}



export type Maybe<T> = CNothing<T> | CJust<T>;
export function Nothing<T>(): Maybe<T> { return new CNothing(); }
export function Just<T>(x:T): Maybe<T> { return  new CJust(x); }



/*
const foo: Maybe<number> = Nothing;
const bar: Maybe<number> = Just(2);
// const baz: Maybe<string> = Just(4); //=> expect ERROR
const boo: Maybe<string> = foo;        //=> expect ERROR. BUT NOT HAPPENED.
// const boz: Maybe<string> = bar;     //=> expect ERROR
 */

// vim: sw=2 ts=8 noexpandtab
