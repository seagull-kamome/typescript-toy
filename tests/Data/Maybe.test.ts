/**
 * @file
 * @brief Test for Data/Maybe
 */

import { Maybe, Nothing, Just } from 'Data/Maybe';

const x0: Maybe<number> = Nothing();
const x1: Maybe<number> = Just(2);
const y0: Maybe<string> = Nothing();
const y1: Maybe<string> = Just('hello!');

describe('Test for Data/Maybe&,', () => {
  test('isJust/isNothing', () => {
    expect(x0.isNothing()).toBe(true);
    expect(x1.isNothing()).toBe(false);
    expect(y0.isNothing()).toBe(true);
    expect(y1.isNothing()).toBe(false);

    expect(x0.isJust()).toBe(false);
    expect(x1.isJust()).toBe(true);
    expect(y0.isJust()).toBe(false);
    expect(y1.isJust()).toBe(true);
  });

  test('Data retrieve', () => {
    expect(x0.fromMaybe(10)).toBe(10);
    // expect(x0.fromMaybe('a')).toBe('a');   //=> expecting compiler error. OK
    expect(x1.fromMaybe(10)).toBe(2);
    // expect(x1.fromMaybe('a')).toBe('a');   //=> expecting compiler error. OK.

    expect(y0.fromMaybe('world')).toBe('world');
    expect(y1.fromMaybe('world')).toBe('hello!');
  });

  test('Transform', () => {
    expect(x0.maybe((x:number) => x.toString(), 'BOO')).toBe('BOO');
    expect(x1.maybe((x:number) => x.toString(), 'BOO')).toBe('2');
  });

});

