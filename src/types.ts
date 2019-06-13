export type Lit = string | number | boolean | undefined | null | void | {};
export type Prefer<P, T> = P & Omit<T, keyof P>;
