/**
 * @file
 * @brief
 */

export function identity<A>(x: A): A { return  x; }
export function combine<A, B, C>(fa: (a:A) => C, fb: (b:B) => A): (b:B) => C {
  return (b) => fa(fb(b)); }


