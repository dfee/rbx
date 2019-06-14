export type Prefer<P, T> = P & Omit<T, keyof P>;

// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
export type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;
