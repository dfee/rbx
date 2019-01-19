export type Lit = string | number | boolean | undefined | null | void | {};
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type Prefer<P, T> = P & Omit<T, keyof P>;
// tslint:disable-next-line: no-any
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
