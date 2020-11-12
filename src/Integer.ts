/**
 * @file
 * @bried Implementation of Integer.
 */


/** Pre-checked integral number.
 */
export class Integer {
  readonly value: number;
  private constructor(x: number) { this.value = x; }

  static floor(x: number): Integer { return new Integer(Math.floor(x)); }
  static ceil(x: number): Integer { return new Integer(Math.ceil(x)); }
  static round(x: number): Integer { return new Integer(Math.round(x)); }

  static unsafeFromNumber(x: number): Integer { return new Integer(x); }
}

/*
 * const x = Integer.floor(2.1);
 * // const y = new Integer(3.5);       <-- error
 *
 * function foo(): void {
 *   var z = Integer.floor(5.5);
 *   // z.value = 2;                    <-- error
 * }
 */

