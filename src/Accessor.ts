/**
 * @file
 * @brief Implimentation of MutableAccessor.
 *
 * This is useless. Just experimental.
 */

type Modifier<E, A> = <B>(e:E, fa: (x:A) => [B, A]) => B;
type Getter<E, A> = <B>(e:E, fa: (x:A) => B) => B;
type Setter<E, A> = (e:E, x:A) => void;

export class MutableAccessor<E, A> {
  constructor(
    private readonly modifyer: Modifier<E, A>,
    private readonly getter: Getter<E, A>,
    private readonly setter: Setter<E, A>) { }

  static fromModifier<E, A>(fa: Modifier<E, A>, fb?: Getter<E, A>, fc?: Setter<E, A>) {
    return new MutableAccessor<E, A>(
      fa,
      ((fb != null)? fb : (e, g) => fa(e, x => [ g(x), x ]) ),
      ((fc != null)? fc : (e, y) => fa(e, x => [ null, y ]) ) );
  }

  static from<E, A>(fb: Getter<E, A>, fc: Setter<E, A>) {
    return new MutableAccessor<E, A>(
      (e, f) => { const [x, y] = fb(e, f); fc(e, y); return x; },
      fb, fc);
  }

  runGetter<B>(e:E, fa: (a:A) => B): B { return this.getter(e, fa); }
  runSetter(e:E, a:A): void { return this.setter(e, a); }

  //  bind<B>(acc: MutableAccessor<A, B>): MutableAccessir<E, B> {
  //}
}


