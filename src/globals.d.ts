type Lit = string | number | boolean | undefined | null | void | {};
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
