/**
 * @file
 * @brief Implementation file of basic perser types.
 *
 * Copyright(C) 2020, HATTORI, Hiroki
 * All rights resreved.
 */

import { Tagged_, Tagged } from 'Data/Tagged';
import { Either, Left, Right } from 'Data/Either';
import { Maybe, Nothing, Just} from 'Data/Maybe';
import { Lazy } from 'Data/Lazy';

export interface Pos { line: number; column: number; }
export interface PerseError<E> { errpos: Pos; err: E; }

export type PerseResult<E, T> = Either<PerseError<E>, T>;

export type BasicPerserError<T>
  = Tagged<'expected', [ T, T ] >
  | Tagged<'unexpected', [ T, T[] ] >;

interface BasicPerser<E, T> {
  any(): PerseResult<E, T>;
  eof(): PerseResult<E, void>;
  oneOf(xs: T[]): PerseResult<E, T>;
  optional(x: T): PerseResult<E, Maybe<T>>;
}



interface CharPerser<E, CH> extends BasicPerser<E, CH> {
}

interface TokenPerser<E, TOK> extends BasicPerser<E, TOK> {
}

