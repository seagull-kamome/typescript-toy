/**
 * @file
 * @brief Implementation of some missing utilities for Array.
 *
 * Copyright (C) 2020, HATTORI, Hiroki
 * All rights reserved.
 */

/**
 *
 * >>> zipWith(((x, y) => x + y), [1,2,3], [4,5,6])
 * [ 5, 7, 9 ]
 * >>> zip([1,2,3], ['a', 'b', 'c'])
 * [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ]
 */
export const zipWith = <A, B, C>(f:(a:A, b:B) => C, xs: A[], ys: B[]):C[] =>
  (xs.length < ys.length)? xs.map((x, i) => f(x, ys[i]))
    : ys.map((y, i) => f(xs[i], y))

/**
 *
 * >>> zip([1,2,3], [4,5,6])
 * [[1, 4], [2, 5], [3, 6]]
 */
export const zip = <A, B>(xs: A[], ys: B[]): [A,B][] => zipWith((x, y) => [x, y], xs, ys)




// vim: sw=2 ts=8 noexpandtab :
